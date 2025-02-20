import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Passanger = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [passengerData, setPassengerData] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Tambahkan state total halaman

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async (page) => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/customer/passangers?page=${page}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDatas(response.data.data);
        setTotalPages(response.data.last_page); // Ambil total halaman dari response API
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleOpenModal = (passenger = null) => {
    setMessage("");
    setEditMode(!!passenger);
    setModalOpen(true);

    if (passenger) {
      setSelectedPassenger(passenger);
      setPassengerData({
        id: passenger.id,
        name: passenger.name,
        email: passenger.email,
        address: passenger.address,
        password: "", // Password dikosongkan untuk keamanan
      });
    } else {
      setSelectedPassenger(null);
      setPassengerData({
        id: "",
        name: "",
        email: "",
        address: "",
        password: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const token = localStorage.getItem("token");

    try {
      if (editMode) {
        // API untuk Update
        await axios.put(
          `${baseUrl}/api/customer/passangers/${passengerData.id}`,
          passengerData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDatas((prevDatas) =>
          prevDatas.map((item) =>
            item.id === passengerData.id ? { ...item, ...passengerData } : item
          )
        );

        setMessage("Data berhasil diperbarui!");
      } else {
        // API untuk Create
        const response = await axios.post(
          `${baseUrl}/api/customer/passangers`,
          passengerData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setDatas((prevDatas) => [...prevDatas, response.data]);
        setMessage("Data berhasil ditambahkan!");
      }

      setTimeout(() => {
        setModalOpen(false);
        setMessage("");
      }, 1500);
    } catch (error) {
      setError(true);
      setMessage(error.response?.data?.message || "Gagal memperbarui data.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      return;
    }

    try {
      await axios.delete(`${baseUrl}/api/customer/passangers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Perbarui state setelah penghapusan berhasil
      setDatas((prevData) => prevData.filter((data) => data.id !== id));
      setFilteredData((prevData) => prevData.filter((data) => data.id !== id));

      alert("Data berhasil dihapus.");
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      alert("Gagal menghapus data.");
    }
  };

  return (
    <>
      <AdminLayout />
      <main id="main" className="main">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Daftar Penumpang</h5>
            <div className="d-flex justify-content-end me-5">
              <button
                className="btn btn-primary mb-3"
                onClick={() => handleOpenModal()}
              >
                Tambah Penumpang
              </button>
            </div>

            {message && (
              <div
                className={`alert ${
                  error ? "alert-danger" : "alert-success"
                } mt-3`}
              >
                {message}
              </div>
            )}

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Email</th>
                  <th scope="col">Alamat</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Memuat data...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="5" className="text-center text-danger">
                      Gagal memuat data.
                    </td>
                  </tr>
                ) : datas.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Tidak ada data.
                    </td>
                  </tr>
                ) : (
                  datas.map((data, index) => (
                    <tr key={data.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.address}</td>
                      <td>
                        <button
                          className="btn btn-warning mx-1"
                          onClick={() => handleOpenModal(data)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(data.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="d-flex justify-content-end mt-3">
              <button
                className="btn btn-secondary mx-1"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Prev
              </button>
              <span className="align-self-center">
                Halaman {page} dari {totalPages}
              </span>
              <button
                className="btn btn-secondary mx-1"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {modalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? "Edit Penumpang" : "Tambah Penumpang"}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalOpen(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {message && (
                  <div
                    className={`alert ${
                      error ? "alert-danger" : "alert-success"
                    }`}
                  >
                    {message}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Nama</label>
                    <input
                      type="text"
                      className="form-control"
                      value={passengerData.name}
                      onChange={(e) =>
                        setPassengerData({
                          ...passengerData,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={passengerData.email}
                      onChange={(e) =>
                        setPassengerData({
                          ...passengerData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Alamat</label>
                    <input
                      type="text"
                      className="form-control"
                      value={passengerData.address}
                      onChange={(e) =>
                        setPassengerData({
                          ...passengerData,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Password (opsional)</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passengerData.password}
                      onChange={(e) =>
                        setPassengerData({
                          ...passengerData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setModalOpen(false)}
                    >
                      Tutup
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editMode ? "Simpan Perubahan" : "Tambah"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Passanger;
