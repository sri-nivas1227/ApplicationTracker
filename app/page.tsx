"use client";
import Image from "next/image";
import searchIcon from "@/app/assets/icons/search-icon.svg";
import CreateApplicationTile from "./components/CreateApplicationTile";
import { Toaster, toast } from "sonner";
import ApplicationTile from "./components/ApplicationTile";
import { useEffect, useState } from "react";
import DetailModal from "./components/DetailModal";
import { getAllApplicationsAction } from "./actions";
export default function Home() {
  const [showModal, setShowModal] = useState<boolean>();
  const [modalAction, setModalAction] = useState<"create" | "edit" | "view">();
  const [applicationList, setApplicationList] = useState<any>();
  const [selectedApplication, setSelectedApplication] = useState<any>();
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    if (!showModal) {
      const applications = getAllApplicationsAction();
      setApplicationList(applications);
    }
  }, [showModal]);
  return (
    <div className="bg-dark-blue w-full h-full">
      <div className="p-4 flex justify-center items-center">
        <div className="w-1/2 rounded-full bg-light-blue bg-opacity-40 flex items-center">
          <input
            type="text"
            placeholder="Search for applications"
            className="w-full placeholder:text-gray-500 bg-transparent outline-none text-dark-gray text-xl rounded-lg px-2"
          />
          <div className="ml-2 cursor-pointer">
            <Image src={searchIcon} alt="search icon" className="w-14 " />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6 gap-x-10">
        <CreateApplicationTile
          setShowModal={setShowModal}
          setModalAction={setModalAction}
        />
        {applicationList &&
          applicationList.map((item: any) => (
            <div key={item.id}>
              <ApplicationTile
                application={item}
                setShowModal={setShowModal}
                setModalAction={setModalAction}
                setApplication={setSelectedApplication}
              />
            </div>
          ))}
      </div>
      {showModal ? (
        <DetailModal
          application={selectedApplication}
          setShowModal={setShowModal}
          modalAction={modalAction}
          setModalAction={setModalAction}
          toast={toast}
          userId={userData?.id ?? "1"}
          setSelectedApplication={setSelectedApplication}
        />
      ) : null}
      <Toaster />
    </div>
  );
}
