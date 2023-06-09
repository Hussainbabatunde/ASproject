import React, { useEffect } from "react";
import { useState } from "react";
import { Get_Admin_Privilage_fun } from "../../../Slice/Admin/AdminAllAdmins/AdminPrivilageSlice";
import { useDispatch, useSelector } from "react-redux";
import { AdminGetAllPermissionsRequest } from "../../../Slice/Admin/AdminAllAdmins/AdminPermissionSlice";
import { Create_authorize_fun } from "../../../Slice/Admin/AuthorizeSlice";

function Attach_Permissions_To_Privilege() {
  const dispatch = useDispatch();

  const { get_All_Admin_Admin_Privilage } = useSelector(
    (state) => state?.reducer?.AdminPrivilageSlice
  );

  const Permission_data = useSelector(
    (state) => state?.reducer?.AdminAllAdminSlice?.GetAdminPermissiondata?.data
  );

  useEffect(() => {
    dispatch(Get_Admin_Privilage_fun());
    dispatch(AdminGetAllPermissionsRequest());
    // The return function is optional and is used for cleanup
    return () => {
      // No cleanup necessary in this case, so an empty function is returned
    };
  }, []);

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const [formData, setFormData] = useState({
    id: null,
    firstname: "",
    surname: "",
    phone: "",
    email: "",
  });

  const [role_data, setRole_data] = useState({
    id: formData.id,
    firstname: formData.firstname,
    surname: formData.surname,
    phone: formData.phone,
    email: formData.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRole_data((prevState) => ({ ...prevState, [name]: value }));
  };

  const filteredRole = get_All_Admin_Admin_Privilage?.data.filter(
    (roleitem) => {
      return roleitem.name.toLowerCase().includes(searchText.toLowerCase());
    }
  );

  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handlePermissionChange = (permissionId) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permissionId)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  const [selectedData, setSelectedData] = useState(null);
  const handleSelectData = (item) => {
    setSelectedData(item);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {
      privilege: selectedData.id,
      permission: selectedPermissions,
    };

    console.log(data);

    dispatch(Create_authorize_fun(data));
  };
  return (
    <div>
      <h1> Attach Permission(s) To Privilege</h1>

      <p className="w-[70%]">
        An Admin is created from an employee account. The Employee would use
        their already existing password to login to their Admin account
      </p>

      <div className="mb-3">
        <label htmlFor="" className=" font-medium text-sm">
          Role Name
        </label>

        <input
          type="text"
          id="search-input"
          value={searchText}
          onChange={handleSearchChange}
          name="role_name"
          className="w-full rounded-lg border border-solid border-[#D0D5DD]
px-2 py-2 shadow bg-white outline-none mt-2 mb-2 text-base text-[#667085]
font-['Manrope']"
        />

        <div className="the_role_list">
          <ul className="mt-2 divide-y divide-gray-200">
            {filteredRole.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => handleSelectData(item)}
                  className="py-2 cursor-pointer hover:bg-gray-100"
                >
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          {Permission_data.map((permission) => (
            <div key={permission.id} className="flex items-center mb-5">
              <input
                type="checkbox"
                id={`permission-${permission.id}`}
                name={`permission-${permission.id}`}
                value={permission.id}
                checked={selectedPermissions.includes(permission.id)}
                onChange={() => handlePermissionChange(permission.id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label
                htmlFor={`permission-${permission.id}`}
                className="ml-2 block  font-medium text-gray-700 text-[1rem]"
              >
                {permission.name} :: {permission.description}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button className="Adminpage_CreateAdmins" onClick={handleSubmit}>
            Submit
            {/* <AiOutlineArrowRight style={{ marginLeft: '10px' }} /> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attach_Permissions_To_Privilege;
