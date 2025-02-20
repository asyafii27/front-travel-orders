import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AutoSuggestInput = ({ label, value, onChange }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  const [regencies, setRegencies] = useState([]); // Data kota dari API
  const [filteredRegencies, setFilteredRegencies] = useState([]); // Data yang difilter
  const [showDropdown, setShowDropdown] = useState(false); // Kontrol tampilan dropdown

  // Fetch data saat input difokuskan
  const fetchRegencies = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/master/regencies?page=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRegencies(response.data.data);
      setFilteredRegencies(response.data.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Gagal mengambil data regencies:", error);
    }
  };

  // Handle input untuk memfilter data kota
  const handleInputChange = (e) => {
    const value = e.target.value;
    onChange(value); // Update state di parent
    const filtered = regencies.filter((regency) =>
      regency.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRegencies(filtered);
  };

  // Pilih kota dari dropdown
  const handleSelectRegency = (regency) => {
    onChange(regency.name);
    setShowDropdown(false);
  };

  return (
    <div className="form-group position-relative">
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        value={value}
        onFocus={fetchRegencies} // Hit API saat input difokuskan
        onChange={handleInputChange} // Filter berdasarkan inputan
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // Sembunyikan dropdown setelah blur
      />
      {/* Dropdown Select */}
      {showDropdown && filteredRegencies.length > 0 && (
        <ul
          className="list-group position-absolute w-100"
          style={{ zIndex: 1000 }}
        >
          {filteredRegencies.map((regency) => (
            <li
              key={regency.id}
              className="list-group-item list-group-item-action"
              onMouseDown={() => handleSelectRegency(regency)}
            >
              {regency.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TravelSchedule = () => {
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTravelSchedule, setSelectedTravelSchedule] = useState(null);
  const [travelScheduleData, setTravelScheduleData] = useState({
    id: "",
    regency_from_id: "",
    regency_to_id: "",
    departure_start: "",
    departure_finish: "",
    quota: "",
    ticket_price: "",
  });

  const [regencies, setRegencies] = useState([]); // State untuk menyimpan data regencies
  const [filteredRegencies, setFilteredRegencies] = useState([]); // Data yang difilter
  const [showDropdown, setShowDropdown] = useState(false); // Kontrol tampilan dropdown

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async (page) => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/customer/travel-schedules?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDatas(response.data.data);
        setTotalPages(response.data.last_page); // Untuk mengambil totdal halaman darii response API
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData(page);
  }, [page]);

  function formatTanggalIndonesia(datetime) {
    const bulanIndo = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dateObj = new Date(datetime);
    const tanggal = dateObj.getDate().toString().padStart(2, "0");
    const bulan = bulanIndo[dateObj.getMonth()];
    const tahun = dateObj.getFullYear();
    const jam = dateObj.getHours().toString().padStart(2, "0");
    const menit = dateObj.getMinutes().toString().padStart(2, "0");

    return `${tanggal} ${bulan} ${tahun} pukul ${jam}:${menit}`;
  }

  function formatRupiah(angka) {
    return parseFloat(angka).toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const handleOpenModal = (travelSchedule = null) => {
    setMessage("");
    setEditMode(!!travelSchedule);
    setModalOpen(true);

    if (travelSchedule) {
      setSelectedTravelSchedule(travelSchedule);
      setTravelScheduleData({
        id: travelSchedule.id,
        regency_from_id: travelSchedule.regency_from_id,
        regency_to_id: travelSchedule.regency_to_id,
        departure_start: travelSchedule.departure_start,
        departure_finish: travelSchedule.departure_finish,
        quota: travelSchedule.quota,
        ticket_price: travelSchedule.quota,
      });
    } else {
      setSelectedTravelSchedule(null);
      setTravelScheduleData({
        id: "",
        regency_from_id: "",
        regency_to_id: "",
        departure_start: "",
        departure_finish: "",
        quota: "",
        ticket_price: "",
      });
    }
  };

  return (
    <>
      <AdminLayout />
      <main id="main" className="main">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Data Jadwal perjlanan</h5>
            <div className="d-flex justify-content-end me-5">
              <button
                className="btn btn-primary mb-3"
                onClick={() => handleOpenModal()}
              >
                Tambah Jadwal Perjalanan
              </button>
            </div>

            {/* {message && (
                            <div
                                className={`alert ${error ? "alert-danger" : "alert-success"
                                    } mt-3`}
                            >
                                {message}
                            </div>
                        )} */}

            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Asal</th>
                  <th scope="col">Tujuan</th>
                  <th scope="col">Kuota</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Memuat data...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="text-center text-danger">
                      Gagal memuat data.
                    </td>
                  </tr>
                ) : datas.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center">
                      Tidak ada data.
                    </td>
                  </tr>
                ) : (
                  datas.map((data, index) => (
                    <tr key={data.id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {data.regency_from.name}
                        <p>{formatTanggalIndonesia(data.departure_start)}</p>
                      </td>
                      <td>
                        {data.regency_to.name} -
                        <p>{formatTanggalIndonesia(data.departure_finish)}</p>
                      </td>
                      <td>{data.quota}</td>
                      <td>Rp{formatRupiah(data.ticket_price)}</td>
                      <td>
                        <button
                          className="btn btn-warning mx-1"
                          //   onClick={() => handleOpenModal(data)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          //   onClick={() => handleDelete(data.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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
          <div className="modal-dialog modal-lg mt-5" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode
                    ? "Edit Jadwal Perjalanan"
                    : "Tambah Jadwal Perjalanan"}
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
                <form onSubmit="">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <AutoSuggestInput
                          label="Kota Awal Perjalanan"
                          value={travelScheduleData.regency_from_id}
                          onChange={(value) =>
                            setTravelScheduleData({
                              ...travelScheduleData,
                              regency_from_id: value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Hari</label>
                        <input type="date" className="form-control" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Jam</label>
                        <input type="time" className="form-control" />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-md-6">
                      <div className="form-group position-relative">
                        <AutoSuggestInput
                          label="Kota Akhir Perjalanan"
                          value={travelScheduleData.regency_to_id}
                          onChange={(value) =>
                            setTravelScheduleData({
                              ...travelScheduleData,
                              regency_to_id: value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Hari</label>
                        <input type="date" className="form-control" />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Jam</label>
                        <input type="time" className="form-control" />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="form-group">
                      <label>Kuota</label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="form-group">
                      <label>Harga Tiket</label>
                      <input type="number" className="form-control" />
                    </div>
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

export default TravelSchedule;
