#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <signal.h>
#include <fcntl.h>

#define PORT 3000
#define DIST "/home/z/my-project/dist"
#define BUFSIZE 8192

static const char *get_mime(const char *path) {
    const char *ext = strrchr(path, '.');
    if (!ext) return "application/octet-stream";
    if (strcmp(ext, ".html") == 0 || strcmp(ext, ".htm") == 0) return "text/html; charset=utf-8";
    if (strcmp(ext, ".js") == 0 || strcmp(ext, ".mjs") == 0) return "application/javascript; charset=utf-8";
    if (strcmp(ext, ".css") == 0) return "text/css; charset=utf-8";
    if (strcmp(ext, ".json") == 0) return "application/json";
    if (strcmp(ext, ".png") == 0) return "image/png";
    if (strcmp(ext, ".jpg") == 0 || strcmp(ext, ".jpeg") == 0) return "image/jpeg";
    if (strcmp(ext, ".webp") == 0) return "image/webp";
    if (strcmp(ext, ".svg") == 0) return "image/svg+xml";
    if (strcmp(ext, ".ico") == 0) return "image/x-icon";
    if (strcmp(ext, ".woff") == 0) return "font/woff";
    if (strcmp(ext, ".woff2") == 0) return "font/woff2";
    if (strcmp(ext, ".map") == 0) return "application/json";
    return "application/octet-stream";
}

int main() {
    signal(SIGPIPE, SIG_IGN);
    signal(SIGHUP, SIG_IGN);
    
    // Daemonize
    if (fork() != 0) return 0;
    setsid();
    close(0); close(1); close(2);
    
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_port = htons(PORT),
        .sin_addr.s_addr = INADDR_ANY
    };
    
    if (bind(server_fd, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        exit(1);
    }
    listen(server_fd, 128);
    
    while (1) {
        int client_fd = accept(server_fd, NULL, NULL);
        if (client_fd < 0) continue;
        
        char buf[BUFSIZE];
        int n = read(client_fd, buf, BUFSIZE - 1);
        if (n <= 0) { close(client_fd); continue; }
        buf[n] = 0;
        
        // Parse method and path
        char method[16], path[1024];
        sscanf(buf, "%s %s", method, path);
        
        // Remove query string
        char *qs = strchr(path, '?');
        if (qs) *qs = 0;
        
        // Build file path
        char filepath[2048];
        if (strcmp(path, "/") == 0) {
            snprintf(filepath, sizeof(filepath), "%s/index.html", DIST);
        } else {
            snprintf(filepath, sizeof(filepath), "%s%s", DIST, path);
        }
        
        // Try to open file
        FILE *f = fopen(filepath, "rb");
        if (!f) {
            // SPA fallback
            snprintf(filepath, sizeof(filepath), "%s/index.html", DIST);
            f = fopen(filepath, "rb");
        }
        
        if (f) {
            fseek(f, 0, SEEK_END);
            long size = ftell(f);
            fseek(f, 0, SEEK_SET);
            
            const char *mime = get_mime(filepath);
            char header[512];
            int hlen = snprintf(header, sizeof(header),
                "HTTP/1.1 200 OK\r\n"
                "Content-Type: %s\r\n"
                "Content-Length: %ld\r\n"
                "Cache-Control: no-cache\r\n"
                "Connection: close\r\n\r\n", mime, size);
            write(client_fd, header, hlen);
            
            while ((n = fread(buf, 1, BUFSIZE, f)) > 0) {
                write(client_fd, buf, n);
            }
            fclose(f);
        } else {
            const char *resp = "HTTP/1.1 404 Not Found\r\nConnection: close\r\n\r\nNot Found";
            write(client_fd, resp, strlen(resp));
        }
        close(client_fd);
    }
    return 0;
}
