"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "../../globals.css";
import ProfileForm from "../../components/profile/ProfileForm";
import ProjectForm from "../../components/profile/ProjectForm";

const ProfileDetailsPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bgGradient flex flex-col items-center py-10">
        <div className="bg-white bg-opacity-0 rounded-2xl p-8 w-3/4 pt-32 gap-y-7">
          <ProfileForm />
          <ProjectForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileDetailsPage;
