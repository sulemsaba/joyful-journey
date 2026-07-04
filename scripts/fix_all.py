import sys
import os

BASE = '/home/msaba/Desktop/safe/joyful-journey'

# ──────────────────────────────────────────────
# 1. Fix StackSection.tsx - Add animations
# ──────────────────────────────────────────────
stack_file = os.path.join(BASE, 'src/components/StackSection.tsx')

with open(stack_file, 'r') as f:
    content = f.read()

print('=== Fixing StackSection.tsx ===')
print(f'File length: {len(content)} chars')

# Replace stackPositionClasses to add stack-delay CSS variable
old_pos = '''const stackPositionClasses = [
  "[--stack-top:calc(var(--header-height,70px)+0px)] [--stack-z:10]",
  "[--stack-top:calc(var(--header-height,70px)+40px)] [--stack-z:9]",
  "[--stack-top:calc(var(--header-height,70px)+80px)] [--stack-z:8]",
  "[--stack-top:calc(var(--header-height,70px)+120px)] [--stack-z:7]",
  "[--stack-top:calc(var(--header-height,70px)+160px)] [--stack-z:6]",
];'''

new_pos = '''const stackPositionClasses = [
  "[--stack-top:calc(var(--header-height,70px)+0px)] [--stack-z:10] [--stack-delay:0ms]",
  "[--stack-top:calc(var(--header-height,70px)+40px)] [--stack-z:9] [--stack-delay:150ms]",
  "[--stack-top:calc(var(--header-height,70px)+80px)] [--stack-z:8] [--stack-delay:300ms]",
  "[--stack-top:calc(var(--header-height,70px)+120px)] [--stack-z:7] [--stack-delay:450ms]",
  "[--stack-top:calc(var(--header-height,70px)+160px)] [--stack-z:6] [--stack-delay:600ms]",
];'''

if old_pos in content:
    content = content.replace(old_pos, new_pos)
    print('✅ Added stack-delay variable to position classes')
else:
    print('❌ Could not find old position classes in file')

# Replace the article element to add data-reveal and animation classes
old_article = '''            className={`relative w-screen ml-[calc(50%-50vw)] lg:sticky max-lg:mb-8 [top:var(--stack-top)] [z-index:var(--stack-z)] ${
            stackPositionClasses[index] ??
            stackPositionClasses[stackPositionClasses.length - 1]
          }`}
          >
            <div className="max-w-[1320px] mx-auto min-h-screen flex items-center justify-center p-[6.5rem_2rem] max-lg:min-h-0 max-lg:p-6 bg-page">'''

new_article = '''            className={`relative w-screen ml-[calc(50%-50vw)] lg:sticky max-lg:mb-8 [top:var(--stack-top)] [z-index:var(--stack-z)] opacity-0 translate-y-20 transition-all duration-[1000ms] ease-out [transition-delay:calc(var(--stack-delay)*1ms)] ${
            stackPositionClasses[index] ??
            stackPositionClasses[stackPositionClasses.length - 1]
          }`}
          data-reveal
        >
            <div className="max-w-[1320px] mx-auto min-h-screen flex items-center justify-center p-[6.5rem_2rem] max-lg:min-h-0 max-lg:p-6 bg-page">'''

if old_article in content:
    content = content.replace(old_article, new_article)
    print('✅ Added data-reveal and animation classes to article')
else:
    print('❌ Could not find article pattern in file')
    # Debug: show the actual article element
    idx = content.find('<article')
    if idx >= 0:
        print('Found <article> at', idx)
        print(content[idx:idx+600])

with open(stack_file, 'w') as f:
    f.write(content)

print('✅ StackSection.tsx saved')

# ──────────────────────────────────────────────
# 2. Add keyframes to tailwind.css
# ──────────────────────────────────────────────
css_file = os.path.join(BASE, 'src/tailwind.css')

with open(css_file, 'r') as f:
    css_content = f.read()

print('\n=== Fixing tailwind.css ===')

# Check if stack-card animations already exist
if '@keyframes stack-card-rise' in css_content:
    print('⚠️ Stack-card animations already exist in CSS, skipping')
else:
    # Insert after footer-tagline-line block and before page-loader-spin
    old_css = '''  50% { transform: scaleX(1); opacity: 0.5; }
}

@keyframes page-loader-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}'''

    new_css = '''  50% { transform: scaleX(1); opacity: 0.5; }
}

@keyframes stack-card-rise {
  0% {
    transform: translateY(120px) scale(0.94);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes stack-card-inner-float {
  0% { transform: translateY(60px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes page-loader-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}'''

    if old_css in css_content:
        css_content = css_content.replace(old_css, new_css)
        print('✅ Added stack-card keyframes to CSS')
    else:
        print('❌ Could not find insertion point in CSS')

    with open(css_file, 'w') as f:
        f.write(css_content)
    print('✅ tailwind.css saved')

print('\n🎉 All fixes applied successfully!')
