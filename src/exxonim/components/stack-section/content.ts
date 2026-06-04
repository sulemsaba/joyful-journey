import type { FeatureRow, FeatureVisualContent, FeatureVisualKey } from "./types";

export const defaultFeatureRows: FeatureRow[] = [
  {
    title: "Registration and Setup",
    description:
      "Company registration, business name registration, NGO or organization registration, and trademark filing support before operations begin.",
    visualKey: "registration",
  },
  {
    title: "Tax, Licensing, and Approvals",
    description:
      "TIN applications, business licensing, annual returns, and regulator-facing approvals prepared with clearer documentation and follow-up.",
    visualKey: "tax",
  },
  {
    title: "Institutional Support",
    description:
      "OSHA, NSSF, WCF, CRB / ERB, and related institutional registrations coordinated so compliance work stays current and submission-ready.",
    visualKey: "institutional",
  },
];

export const featureVisualContentMap: Record<FeatureVisualKey, FeatureVisualContent> = {
  registration: {
    workstreamValue: "Registration and setup",
    counterpartLabel: "Client",
    counterpartValue: "Client coordination",
    focusValue: "Company, NGO, business name, and trademark setup",
    summaryTitle: "Clear setup steps, fewer avoidable corrections.",
    summaryBody:
      "We organize the registration path, documentation, and filing order so the work moves forward with less confusion and better visibility.",
  },
  tax: {
    workstreamValue: "Compliance and approvals",
    counterpartLabel: "Client",
    counterpartValue: "Client coordination",
    focusValue: "TIN, licensing, returns, and approvals",
    summaryTitle: "Clear next steps, fewer avoidable delays.",
    summaryBody:
      "We organize the filing path, documentation, and authority follow-up so the work moves forward with less back-and-forth and better visibility.",
  },
  institutional: {
    workstreamValue: "Institutional support",
    counterpartLabel: "Coverage",
    counterpartValue: "Employer and board registrations",
    focusValue: "OSHA, NSSF, WCF, CRB / ERB registrations",
    summaryTitle: "Institutional registrations stay organized.",
    summaryBody:
      "We keep employer-side and institutional filing work aligned so renewals, compliance, and submission follow-up stay practical.",
  },
  tracking: {
    workstreamValue: "Consultation tracking",
    counterpartLabel: "Reference",
    counterpartValue: "EXX-24091",
    focusValue: "Status checkpoints, follow-up, and next actions",
    summaryTitle: "Know what is complete and what comes next.",
    summaryBody:
      "We keep intake, review, submission, and authority follow-up visible so the next action stays clear from start to release.",
  },
};
