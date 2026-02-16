import Image from "next/image";
import Link from "next/link";
import crossIcon from "@/app/assets/icons/cross-icon.svg";
import deleteIcon from "@/app/assets/icons/delete-icon-red.svg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import formData from "@/app/tempResources/ApplicationTrackerForm.json";
import InputTypes from "@/app/components/InputTypes";
import { deleteApplicationAction, submitApplicationAction } from "../actions";

type ApplicationData = {
  id?: number;
  [key: string]: any;
};

export default function DetailModal({
  application,
  setShowModal,
  modalAction,
  setModalAction,
  toast,
  userId,
  setSelectedApplication,
}: {
  application: ApplicationData;
  setShowModal: Dispatch<SetStateAction<boolean | undefined>>;
  modalAction: "create" | "edit" | "view" | undefined;
  setModalAction: (value: "create" | "edit" | "view" | undefined) => void;
  toast: any;
  userId: string;
  setSelectedApplication: (value: any) => void;
}) {
  const [applicationForm, setApplicationForm] = useState(
    formData.map((item) => {
      return {
        key: item.key,
        type: item.type,
        value: application?.[item.key] ?? "",
        required: item.required,
        editable: item.editable,
        label: item.label,
        options: item.options,
      };
    }),
  );

  const resetForm = () => {
    setSelectedApplication(undefined);
    setApplicationForm([]);
  };

  const handleModalClose = () => {
    resetForm();
    setShowModal((prev) => !prev);
  };
  const handleInputChange = (key: string, value: string) => {
    const newForm = applicationForm.map((item) => {
      if (item.key === key) {
        return { ...item, value: value };
      }
      return item;
    });
    setApplicationForm(newForm);
  };
  const handleDeleteApplication = () => {
    console.log("deleting application");
    const response = deleteApplicationAction(application["id"]);
    if (response.success) {
      resetForm();
      setShowModal((prev) => !prev);
    }
  };
  const handleSaveApplication = async () => {
    const submitForm: any = {};
    applicationForm.forEach((obj) => {
      submitForm[obj.key] = obj.value;
    });
    if (application?.id) {
      submitForm["id"] = application.id;
    }
    const response = await submitApplicationAction(submitForm);
    if (response.success) {
      setShowModal((prev) => !prev);
    }
  };
  return (
    <div className=" fixed inset-0 bg-dark-gray bg-opacity-20 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 text-dark-blue font-moul border w-2/3 shadow-lg rounded-xl bg-light-cream flex flex-col gap-3">
        <div className="mb-8 flex justify-between items-center">
          <div className="">
            <div className="text-3xl">
              {modalAction === "create"
                ? "Create Application"
                : modalAction === "edit"
                  ? "Edit Application"
                  : application["company"]}
            </div>
            {modalAction !== "create" && (
              <div className="hover:text-steel-blue underline cursor-pointer">
                <Link href={application.job_link ? application.job_link : "#"}>
                  Job Description Link{" "}
                </Link>
              </div>
            )}
          </div>
          {modalAction === "view" && (
            <div
              onClick={() => {
                setModalAction("edit");
              }}
              className="p-2 text-lg bg-light-blue text-dark-gray w-fit rounded-lg cursor-pointer"
            >
              Edit Application
            </div>
          )}
          <div className="p-1 bg-red-500 bg-opacity-30 hover:bg-opacity-50 rounded-lg">
            <Image
              src={crossIcon}
              alt="cross icon"
              onClick={handleModalClose}
              className="cursor-pointer w-6  "
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-[2%]">
          <div className="w-2/3 p-2 text-xl flex flex-col gap-5">
            {modalAction !== "view" ? (
              <>
                {applicationForm.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className={`${
                        modalAction === "edit" && !data.editable
                          ? "hidden"
                          : "block"
                      } grid grid-cols-2 items-center `}
                    >
                      <p className="text-nowrap">
                        {data.label} {data.required ? "*" : ""} :{" "}
                      </p>
                      <InputTypes
                        key={index}
                        inputType={data.type}
                        inputKey={data.key}
                        onInputValueChange={handleInputChange}
                        options={data.options}
                        show={
                          modalAction === "edit"
                            ? data.editable
                              ? true
                              : false
                            : true
                        }
                        existingValue={
                          application
                            ? application[data.key]
                              ? application[data.key]
                              : ""
                            : ""
                        }
                      />
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {formData.map((data, index) => {
                  if (["company", "job_link"].includes(data.key)) {
                    return (
                      <div className="hidden" key={index}>
                        {" "}
                      </div>
                    );
                  }
                  return (
                    <div key={index} className="grid grid-cols-2 items-center">
                      <p className="text-nowrap">{data.label} : </p>
                      {data.key === "resume_link" ||
                      data.key === "cover_letter_link" ? (
                        <Link
                          className="p-1 bg-light-blue rounded-lg w-fit"
                          href={application[data.key]}
                          target="_blank"
                        >
                          View
                        </Link>
                      ) : (
                        <p className="text-lg text-dark-gray">
                          {application[data.key] ? application[data.key] : "-"}
                        </p>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
          {/* <div className="w-1/3 p-2">
            <PointsInModal />
          </div> */}
        </div>
        <div className="flex justify-between items-center">
          <div
            onClick={handleDeleteApplication}
            className="bg-red-500 bg-opacity-30 p-2 border rounded-lg cursor-pointer"
          >
            <Image src={deleteIcon} alt="delete icon" className="w-8" />
          </div>
          <div
            className={`flex ${
              modalAction == "create" ? "justify-center" : "justify-end"
            } gap-6`}
          >
            <div
              className={`${
                modalAction !== "view" ? "visible" : "invisible"
              } p-2 text-lg bg-steel-blue text-white w-fit rounded-lg cursor-pointer`}
              onClick={handleSaveApplication}
            >
              Save
            </div>
            {modalAction === "create" || modalAction === "edit" ? (
              <div
                className="p-2 text-lg bg-red-500 text-white w-fit rounded-lg cursor-pointer"
                onClick={() => {
                  setModalAction(modalAction === "edit" ? "view" : undefined);
                  if (modalAction != "edit") {
                    handleModalClose();
                  }
                }}
              >
                Cancel
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
