import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useRef, useState } from "react";

const ApproveRiders = () => {
  const axiosSecure = useSecureAxios();
  const [selectedRider, setSelectedRider] = useState(null);
  const modalRef = useRef(null);

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const updatedStatus = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updatedStatus).then((res) => {
      refetch(); // refetch from tanstack query for instant UI update
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Rider status is ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const deleteRider = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Rider has been removed.",
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
            });
            refetch(); // Refresh UI instantly
          }
        });
      }
    });
  };

  // show-modal
  const viewRider = (rider) => {
    // console.log(rider);
    setSelectedRider(rider);
    modalRef.current.showModal();
  };

  return (
    <div className="my-10 mx-auto max-w-6xl">
      <h1 className="text-5xl font-bold">
        {" "}
        Riders Approval pending :{riders.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>
                  <p
                    className={`${
                      rider.status === "approved"
                        ? "text-green-500 bg-green-200"
                        : "text-red-400"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.workStatus}</td>
                <td>
                  {rider.district},{rider.region}
                </td>
                <td>
                  <button onClick={() => viewRider(rider)} className="btn">
                    <FaEye />
                  </button>
                  <button onClick={() => handleApproval(rider)} className="btn">
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn mx-2"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button
                    onClick={() => deleteRider(rider._id)}
                    className="btn "
                  >
                    <FaRegTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal */}
      <dialog ref={modalRef} id="view_rider_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Rider Details</h3>

          {selectedRider && (
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.phone}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.NID}
              </p>
              <p>
                <strong>Driving License:</strong> {selectedRider.drivingLicense}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>Status:</strong> {selectedRider.status}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedRider.createdAt).toLocaleString()}
              </p>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ApproveRiders;
