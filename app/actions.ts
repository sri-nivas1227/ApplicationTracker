type Application = {
  role: string;
  company: string;
  job_link: string;
  date_applied: Date;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: string;
};

export async function submitApplicationAction(application: Application) {
  console.log("submitting the application")
  const response = await fetch("/api/application", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(application),
  });
  return await response.json();
}
