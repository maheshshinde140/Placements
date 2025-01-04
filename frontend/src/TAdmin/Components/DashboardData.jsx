import React, { useEffect } from "react";
import { SiConstruct3 } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, listUsersOfCollege } from "../../redux/userSlice";

const DashboardData = () => {
  const dispatch = useDispatch();
  const { user, status, error, collegeUsers } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchUserById(user._id));
      dispatch(listUsersOfCollege(user.college._id));
    }
  }, [dispatch, user?._id]);
 
  if (status === "loading" || !user || !user.college) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-5 p-5">
      <div className="flex items-start gap-6">
        <div>
          <div className="bg-[#ffffff80] backdrop-blur-sm mb-6 p-5 rounded-[20px] w-[320px] shadow-lg flex flex-col items-center text-center">
            <img
              src="https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg"
              alt="Upload Illustration"
              className="w-36 h-36 object-cover rounded-xl mb-5 mt-3"
            />
            <ul className="list-none m-0 text-[rgb(22,22,59)]">
              <li className="text-2xl font-black mb-2 text-[rgb(22,22,59)]">
                <strong>T&P Head</strong>
              </li>
              <li className="mb-3">
                <h6 className="text-md font-bold px-3 text-[rgb(22,22,59)]">
                  {user?.email || "tnpadmin@college.com"}
                </h6>
                <h6 className="text-xl font-bold px-3 text-[rgb(48,48,128)]">
                  {user?.college.name || "tnpadmin@abha.com"}
                </h6>
                <h6 className="text-lg font-medium px-3 text-[rgb(22,22,59)]">
                  {user?.college.address || "Nanded"}
                </h6>
              </li>
              <li className="text-base flex items-center">
                <strong>Subscription Type :</strong>
                <h6 className="text-base font-semibold text-gray-700 uppercase ml-2 px-3">
                  {user?.college?.subscription.planType}
                </h6>
              </li>
              <li className="text-base flex items-center">
                <strong>Start Date : </strong>
                <h6 className="text-base ml-2 px-3">
                  {new Date(
                    user?.college?.subscription.startDate
                  ).toLocaleDateString() || "NA"}
                </h6>
              </li>
              <li className="text-base flex items-center">
                <strong>End Date :</strong>
                <h6 className="text-base text-red-800 ml-2 px-3">
                  {new Date(
                    user?.college?.subscription.endDate
                  ).toLocaleDateString() || "NA"}
                </h6>
              </li>
              <li className="text-base flex items-center">
                <strong>Status :</strong>
                <h6 className=" font-bold text-green-600 uppercase ml-2 px-3">
                  {user?.college?.subscription.status || "NA"}
                </h6>
              </li>
            </ul>
            <button className="mt-5 bg-[#A6C0CF] text-[rgb(22,22,59)] font-bold border border-[#84a7bb] rounded-lg px-3 py-1 shadow-md hover:bg-[#84a7bb]">
              Contact HarIT Tech
            </button>
          </div>
          <div className="bg-[#ffffff80] backdrop-blur-sm mb-6 p-5 w-[320px] rounded-[20px] shadow-lg">
            <h3 className="text-lg font-bold mb-3">Recently Added Student's</h3>
            <div>
              {[...collegeUsers] // Create a copy of the array
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by createdAt in descending order
                .slice(0, 3) // Take the top 3 students
                .map((student) => (
                  <div
                    key={student._id}
                    className="flex w-[100%] items-center mb-4 py-[6px] px-[10px] bg-[#ffffff37] backdrop-blur-sm shadow-md rounded-[20px] hover:bg-[#ffffffb9] cursor-pointer"
                  >
                    <img
                      src={
                        student.profilePic ||
                        "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
                      }
                      alt="avatar"
                      className="w-[40px] h-[40px] object-cover rounded-2xl mr-4"
                    />
                    <div className="flex-1">
                      <div className="font-bold text-[16px] text-[#333]">
                        {student.email}
                      </div>
                      <div className="font-semibold text-[14px] text-[#383838]">
                        Created on:{" "}
                        {new Date(student.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[#ffffff80] mb-6 backdrop-blur-sm p-5 min-w-[430px] rounded-[20px] shadow-lg">
            <h3 className="text-lg font-bold mb-3">Student Analytics</h3>
          </div>

          <div className="bg-[#ffffff80] mb-6 backdrop-blur-sm p-5 min-w-[430px] rounded-[20px] shadow-lg">
            <h3 className="text-lg font-bold mb-3">Recent's Post</h3>
            <div className="w-[100%] justify-items-center my-3 ">
              <div className="flex w-[100%] items-center mb-4 p-3 bg-[#ffffff37] backdrop-blur-sm shadow-md rounded-[20px] hover:bg-[#ffffffb9] cursor-pointer">
                <img
                  src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
                  alt="avatar"
                  className="w-[52px] h-[52px] object-cover rounded-2xl mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-[16px] text-[#333]">
                      Job Title
                    </span>
                    <span className="text-[13px] text-[#717171]">date</span>
                  </div>
                  <div className="font-semibold text-[15px] text-[#383838]">
                    Company Name
                  </div>
                </div>
              </div>

              <div className="flex w-[100%] items-center mb-4 p-3 bg-[#ffffff37] backdrop-blur-sm shadow-md rounded-[20px] hover:bg-[#ffffffb9] cursor-pointer">
                <img
                  src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
                  alt="avatar"
                  className="w-[52px] h-[52px] object-cover rounded-2xl mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-[16px] text-[#333]">
                      Job Title
                    </span>
                    <span className="text-[13px] text-[#717171]">date</span>
                  </div>
                  <div className="font-semibold text-[15px] text-[#383838]">
                    Company Name
                  </div>
                </div>
              </div>

              <div className="flex w-[100%] items-center mb-4 p-3 bg-[#ffffff37] backdrop-blur-sm shadow-md rounded-[20px] hover:bg-[#ffffffb9] cursor-pointer">
                <img
                  src="https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg"
                  alt="avatar"
                  className="w-[52px] h-[52px] object-cover rounded-2xl mr-4"
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-[16px] text-[#333]">
                      Job Title
                    </span>
                    <span className="text-[13px] text-[#717171]">date</span>
                  </div>
                  <div className="font-semibold text-[15px] text-[#383838]">
                    Company Name
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff80] mb-6 backdrop-blur-sm p-5 min-w-[430px] rounded-[20px] shadow-lg">
            <h3 className="text-lg font-bold mb-3">Recently Placed Students</h3>
            <div className="w-[100%] justify-items-center my-3 ">
              <SiConstruct3 className="w-[120px] h-[120px] text-[#b0b0b0dc]" />
              <h6 className="text-lg font-bold text-[#8d8d8dcc]">
                Under Construction
              </h6>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[#ffffff80] mb-6 text-gray-700 backdrop-blur-sm p-5 w-[310px] rounded-[20px] shadow-lg">
            <h3 className="text-xl font-bold mb-3">
              What's new on TNP Portal ?
            </h3>
            <ul className=" ml-3 font-medium text-lg text-gray-600">
              <li className="mb-2 border-b-[1px] border-[rgb(22,22,59)] pb-2">
                Send's Placement Drive to Each Students
              </li>
              <li className="mb-2 border-b-[1px] border-[rgb(22,22,59)] pb-2">
                Manage Students Data
              </li>
              <li className="mb-2 border-b-[1px] border-[rgb(22,22,59)] pb-2">
                Manage Placement Drive Data
              </li>
              <li className="mb-2 pb-2">Direct Access Student Details</li>
            </ul>
          </div>
          <div className="bg-[#ffffff80] mb-6 text-gray-700 backdrop-blur-sm p-5 w-[310px] rounded-[20px] shadow-lg">
            <h3 className="text-xl font-bold mb-3">Upcoming Feature's</h3>
            <ul className=" ml-3  font-medium text-lg text-gray-600">
              <li className="mb-2 border-b-[1px] border-[rgb(22,22,59)] pb-2">
                Create Round for Job's{" "}
              </li>
              <li className="mb-2 border-b-[1px] border-[rgb(22,22,59)] pb-2">
                Student Feedback and Messages
              </li>
              <li className="mb-2 border-b-[1px] border-[rgb(22,22,59)] pb-2">
                Off Campus Placement Opportunity
              </li>
              <li className="mb-2 border-b-[1px] border-[rgb(22,22,59)] pb-2">
                Online Interview
              </li>
              <li className="mb-2 pb-2">AI Resume Builder</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;
