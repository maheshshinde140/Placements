import React from "react";
import toast from "react-hot-toast";
import Lottie from "react-lottie";
import animationData from "./newStudent.json";
import { ClipLoader } from "react-spinners";
import { FaTimes, FaUserPlus, FaEnvelope, FaLock } from "react-icons/fa";

const CreateStudentPopup = ({
  isOpen,
  onClose,
  onCreateStudent,
  status,
  error,
  createdStudent,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCreate = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    onCreateStudent({ email, password });
  };

  React.useEffect(() => {
    if (status === "succeeded" && createdStudent) {
      toast.success(
        `Student ${createdStudent.email} created successfully!` ||
          `Student Created Successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else if (status === "failed") {
      toast.error(error || "Failed to create student", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [status, error, createdStudent]);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    onClose();
  };

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed top-0 z-50 left-[-20px] w-full h-full backdrop-blur-[6px] flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={handleBackgroundClick}
    >
      <div className="bg-[#d6dce0b1]  p-8 rounded-[20px] border border-[rgba(33,86,105,0.758)] w-1/2 max-w-md shadow-lg ">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <FaUserPlus className="mr-2 text-[#3e79a7]" />
            Create New Student
          </h2>
          <button
            type="button"
            className=" p-[6px] rounded-[50%] hover:text-[rgba(33,86,105,0.758)] hover:bg-[#ffffff84] focus:outline-none"
            onClick={handleClose}
          >
            <FaTimes className="text-xl text-[rgb(22,22,59)]" />
          </button>
        </div>
        <form>
          <div className="mb-6">
            <label className="flex text-gray-700 text-sm font-bold mb-2  items-center">
              <FaEnvelope className="mr-2 text-[#3e79a7]" />
              Email
            </label>
            <input
              type="email"
              className="bg-[#ffffff5e] shadow-lg appearance-none border-[2px]  border-[rgba(33,86,105,0.758)] rounded-xl w-full py-3 px-4 text-[rgb(22,22,59)] leading-tight focus:outline-none transition-all duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter student email"
            />
          </div>
          <div className="mb-6">
            <label className="flex text-gray-700 text-sm font-bold mb-2  items-center">
              <FaLock className="mr-2 text-[#3e79a7]" />
              Password
            </label>
            <input
              type="password"
              className="bg-[#ffffff5e] shadow-lg appearance-none border-[2px]  border-[rgba(33,86,105,0.758)] rounded-xl w-full py-3 px-4 text-[rgb(22,22,59)] leading-tight focus:outline-none transition-all duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter student password"
            />
          </div>
          <div className=" justify-items-center">
            <button
              type="button"
              className="bg-[#3e79a7] hover:bg-[#21537a] shadow-lg text-white font-bold py-2 px-6 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 flex items-center"
              onClick={handleCreate}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <ClipLoader size={20} color="#ffffff" className="mr-2" />
              ) : null}
              {status === "loading" ? "Creating..." : "Create Student"}
            </button>
            
          </div>
        </form>
        {status === "succeeded" && createdStudent && (
          <div className="mt-6 text-center">
            <Lottie
              options={{
                animationData: animationData,
                loop: false,
                autoplay: true,
              }}
              height={100}
              width={100}
            />
            <p className="text-gray-600">Email: {createdStudent.email}</p>
          </div>
        )}
        {status === "failed" && error && (
          <p className="text-red-500 mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default CreateStudentPopup;