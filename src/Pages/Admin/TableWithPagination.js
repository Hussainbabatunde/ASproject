import React, { useState } from "react";
import AdminUseTable from "../../Components/Table/AdminUseTable";

const TableWithPagination = ({
  data,
  header,
  handleDelete,
  handleEdit,
  handleRestpassword,
}) => {
  const dummyData = [
    { id: 1, name: "John Doe", email: "johndoe@example.com" },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com" },
    { id: 3, name: "Alice Johnson", email: "alicejohnson@example.com" },
    { id: 4, name: "Bob Williams", email: "bobwilliams@example.com" },
    { id: 5, name: "Emily Davis", email: "emilydavis@example.com" },
    { id: 6, name: "Michael Brown", email: "michaelbrown@example.com" },
    { id: 7, name: "Sarah Wilson", email: "sarahwilson@example.com" },
    { id: 8, name: "David Taylor", email: "davidtaylor@example.com" },
    { id: 9, name: "Olivia Martinez", email: "oliviamartinez@example.com" },
    { id: 10, name: "James Anderson", email: "jamesanderson@example.com" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="max-w-full overflow-x-auto ">
        <AdminUseTable
          header={header}
          data={currentItems}
          // data={[]}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleRestpassword={handleRestpassword}
        />
      </div>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-2 py-1 mx-1 rounded ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default TableWithPagination;
