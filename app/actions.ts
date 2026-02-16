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
  const applications: [any] = localStorage.getItem("applications")
    ? JSON.parse(localStorage.getItem("applications") ?? "")
    : [];

  const oldId = applications.at(-1)?.id ?? 0;
  if (oldId !== 0) {
    const idx = applications.findIndex((a: any) => a.id === oldId);
    if (idx !== -1) {
      applications[idx] = { ...application, id: oldId };
    }
  } else {
    application["id"] = oldId + 1;
    applications.push(application);
  }
  localStorage.setItem("applications", JSON.stringify(applications));
  return { success: true };
}

export function getAllApplicationsAction() {
  const applications = localStorage.getItem("applications")
    ? JSON.parse(localStorage.getItem("applications"))
    : [];
  if (applications) {
    return applications;
  } else {
    return [];
  }
}

export function deleteApplicationAction(id: Int32Array) {
  let applications: [any] = JSON.parse(localStorage.getItem("applications"));
  applications = applications.filter((application) => {
    return application["id"] != id;
  });
  localStorage.setItem("applications", applications);
  return { success: true };
}
