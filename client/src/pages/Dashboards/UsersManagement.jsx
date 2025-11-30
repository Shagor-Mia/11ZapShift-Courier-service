import React from "react";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../hooks/useSecureAxios";
import { FaUserShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useSecureAxios();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });
  //   console.log(users);

  //   handle user to admin
  const handleMakeUser = async (user, role) => {
    const roleInfo = { role: role };
    Swal.fire({
      title: "Are you sure?",
      text: `To make this  an ${role}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${user.displayName} marked as ${role}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h1 className="my-10 mx-auto max-w-6xl">Users Management</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Total:{users.length}</th>
              <th>Name</th>
              <th>email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>OtherActions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {user?.email}
                  </span>
                </td>
                <td>{user?.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleMakeUser(user, "user")}
                      className="btn"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeUser(user, "admin")}
                      className="btn"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>

                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
