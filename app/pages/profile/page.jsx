"use client";

<<<<<<< HEAD
=======
import React, { useState, useEffect } from "react";
>>>>>>> 21929c000e5d2c2e7511b16a329702fa9ceb720a
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
<<<<<<< HEAD
=======
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <form onSubmit={handleProjectSubmit}>
          <div>
            <label className="block text-[#6a9696] text-xl">Project Name</label>
            <input
              type="text"
              name="name"
              value={projectData.name}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Project Website
            </label>
            <input
              type="text"
              name="website"
              value={projectData.website}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Project Type</label>
            <select
              name="type"
              value={projectData.type}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">Select Type</option>
              <option value="physical">Physical</option>
              <option value="non-physical">Non-Physical</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Industry</label>
            <select
              name="industry"
              value={projectData.industry}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">Select Industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Food</option>
              <option value="finance">Finance</option>
              <option value="finance">Fashion</option>
              <option value="finance">Beauty & Skincare</option>
              <option value="finance">Pets</option>
              <option value="finance">Arts & Crafts</option>
              <option value="finance">Gifts</option>
              <option value="finance">Jwellery</option>
              <option value="others">Others</option>
            </select>
            {projectData.industry === "others" && (
              <input
                type="text"
                name="industryOther"
                placeholder="Specify Industry"
                value={projectData.industryOther || ""}
                onChange={handleProjectChange}
                className="w-full p-2 border rounded text-black mt-2"
              />
            )}
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Project Details
            </label>
            <textarea
              name="details"
              value={projectData.details}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            ></textarea>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Started In</label>
            <input
              type="date"
              name="startedIn"
              value={projectData.startedIn}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Yearly Revenue
            </label>
            <input
              type="number"
              name="yearlyRevenue"
              value={projectData.yearlyRevenue}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
            <select
              name="yearlyRevenueCurrency"
              value={projectData.yearlyRevenueCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Monthly Sales
            </label>
            <input
              type="number"
              name="monthlySales"
              value={projectData.monthlySales}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
            <select
              name="monthlySalesCurrency"
              value={projectData.monthlySalesCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Gross Margin (%)
            </label>
            <input
              type="number"
              name="grossMargin"
              value={projectData.grossMargin}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Net Margin (%)
            </label>
            <input
              type="number"
              name="netMargin"
              value={projectData.netMargin}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization)</label>
            <input
              type="number"
              name="ebitda"
              value={projectData.ebitda}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
            <select
              name="ebitdaCurrency"
              value={projectData.ebitdaCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">SKU (Stock Keeping Unit)</label>
            <input
              type="number"
              name="skus"
              value={projectData.skus}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">Funding Required</label>
            <input
              type="number"
              name="originalAsk"
              value={projectData.originalAsk}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
            />
            <select
              name="originalAskCurrency"
              value={projectData.originalAskCurrency}
              onChange={handleCurrencyChange}
              className="w-full p-2 border rounded text-black mt-2"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EURO">EURO</option>
            </select>
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Equity Offered (%)
            </label>
            <input
              type="number"
              name="equityOffered"
              value={projectData.equityOffered}
              onChange={handleProjectChange}
              className="w-full p-2 border rounded text-black"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Debt Accepted?
            </label>
            <input
              type="checkbox"
              name="debtAccept"
              checked={projectData.debtAccept}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label className="text-[#6a9696] text-xl">Yes</label>
            {projectData.debtAccept && (
              <div>
                <label className="block text-[#6a9696] text-xl">
                  Debt Amount
                </label>
                <input
                  type="number"
                  name="debtAmount"
                  value={projectData.debtAmount}
                  onChange={handleProjectChange}
                  className="w-full p-2 border rounded text-black"
                />
                <select
                  name="debtCurrency"
                  value={projectData.debtCurrency}
                  onChange={handleCurrencyChange}
                  className="w-full p-2 border rounded text-black mt-2"
                >
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                  <option value="EURO">EURO</option>
                </select>
              </div>
            )}
          </div>
          <div>
            <label className="block text-[#6a9696] text-xl">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-[#7ebaba] text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleProjectSubmit}
          >
            Save Project
          </button>
        </form>
      </CustomModal>
>>>>>>> 21929c000e5d2c2e7511b16a329702fa9ceb720a
    </>
  );
};

export default ProfileDetailsPage;
