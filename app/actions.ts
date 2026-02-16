type Application = {
  id?: number;
  role: string;
  company: string;
  job_link: string;
  date_applied: Date;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  status: string;
  [key: string]: any;
};

export async function submitApplicationAction(application: Application) {
  const applicationsData = localStorage.getItem("applications");
  const applications: any[] = applicationsData
    ? JSON.parse(applicationsData)
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
  const applicationsData = localStorage.getItem("applications");
  const applications = applicationsData
    ? JSON.parse(applicationsData)
    : [];
  if (applications) {
    return applications;
  } else {
    return [];
  }
}

export function deleteApplicationAction(id: number | undefined) {
  const applicationsData = localStorage.getItem("applications");
  let applications: any[] = applicationsData ? JSON.parse(applicationsData) : [];
  applications = applications.filter((application) => {
    return application["id"] != id;
  });
  localStorage.setItem("applications", JSON.stringify(applications));
  return { success: true };
}
