import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();

  useState(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect ke login jika tidak ada token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Kembali ke halaman login
  };

  return (
    <>
      <AdminLayout />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <div className="row">
            {/* <!-- Left side columns --> */}
            <div className="col-lg-8">
              <div className="row">
                {/* <!-- Sales Card --> */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card sales-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Sales <span>| Today</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-cart"></i>
                        </div>
                        <div className="ps-3">
                          <h6>145</h6>
                          <span className="text-success small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Sales Card --> */}

                {/* <!-- Revenue Card --> */}
                <div className="col-xxl-4 col-md-6">
                  <div className="card info-card revenue-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Revenue <span>| This Month</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-currency-dollar"></i>
                        </div>
                        <div className="ps-3">
                          <h6>$3,264</h6>
                          <span className="text-success small pt-1 fw-bold">
                            8%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            increase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Revenue Card --> */}

                {/* <!-- Customers Card --> */}
                <div className="col-xxl-4 col-xl-12">
                  <div className="card info-card customers-card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Customers <span>| This Year</span>
                      </h5>

                      <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                          <i className="bi bi-people"></i>
                        </div>
                        <div className="ps-3">
                          <h6>1244</h6>
                          <span className="text-danger small pt-1 fw-bold">
                            12%
                          </span>{" "}
                          <span className="text-muted small pt-2 ps-1">
                            decrease
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- End Customers Card --> */}

                {/* <!-- Reports --> */}
                <div className="col-12">
                  <div className="card">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <!-- End Reports --> */}

                {/* <!-- Recent Sales --> */}
                <div className="col-12">
                  <div className="card recent-sales overflow-auto">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Recent Sales <span>| Today</span>
                      </h5>

                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <a href="#">#2457</a>
                            </th>
                            <td>Brandon Jacob</td>
                            <td>
                              <a href="#" className="text-primary">
                                At praesentium minu
                              </a>
                            </td>
                            <td>$64</td>
                            <td>
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">#2147</a>
                            </th>
                            <td>Bridie Kessler</td>
                            <td>
                              <a href="#" className="text-primary">
                                Blanditiis dolor omnis similique
                              </a>
                            </td>
                            <td>$47</td>
                            <td>
                              <span className="badge bg-warning">Pending</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">#2049</a>
                            </th>
                            <td>Ashleigh Langosh</td>
                            <td>
                              <a href="#" className="text-primary">
                                At recusandae consectetur
                              </a>
                            </td>
                            <td>$147</td>
                            <td>
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">#2644</a>
                            </th>
                            <td>Angus Grady</td>
                            <td>
                              <a href="#" className="text-primar">
                                Ut voluptatem id earum et
                              </a>
                            </td>
                            <td>$67</td>
                            <td>
                              <span className="badge bg-danger">Rejected</span>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">#2644</a>
                            </th>
                            <td>Raheem Lehner</td>
                            <td>
                              <a href="#" className="text-primary">
                                Sunt similique distinctio
                              </a>
                            </td>
                            <td>$165</td>
                            <td>
                              <span className="badge bg-success">Approved</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <!-- End Recent Sales --> */}

                {/* <!-- Top Selling --> */}
                <div className="col-12">
                  <div className="card top-selling overflow-auto">
                    <div className="filter">
                      <a className="icon" href="#" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <a className="dropdown-item" href="#">
                            Today
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Month
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            This Year
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body pb-0">
                      <h5 className="card-title">
                        Top Selling <span>| Today</span>
                      </h5>

                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Product</th>
                            <th scope="col">Price</th>
                            <th scope="col">Sold</th>
                            <th scope="col">Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <a href="#">
                                <img src="assets/img/product-1.jpg" alt="" />
                              </a>
                            </th>
                            <td>
                              <a href="#" className="text-primary fw-bold">
                                Ut inventore ipsa voluptas nulla
                              </a>
                            </td>
                            <td>$64</td>
                            <td className="fw-bold">124</td>
                            <td>$5,828</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">
                                <img src="assets/img/product-2.jpg" alt="" />
                              </a>
                            </th>
                            <td>
                              <a href="#" className="text-primary fw-bold">
                                Exercitationem similique doloremque
                              </a>
                            </td>
                            <td>$46</td>
                            <td className="fw-bold">98</td>
                            <td>$4,508</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">
                                <img src="assets/img/product-3.jpg" alt="" />
                              </a>
                            </th>
                            <td>
                              <a href="#" className="text-primary fw-bold">
                                Doloribus nisi exercitationem
                              </a>
                            </td>
                            <td>$59</td>
                            <td className="fw-bold">74</td>
                            <td>$4,366</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">
                                <img src="assets/img/product-4.jpg" alt="" />
                              </a>
                            </th>
                            <td>
                              <a href="#" className="text-primary fw-bold">
                                Officiis quaerat sint rerum error
                              </a>
                            </td>
                            <td>$32</td>
                            <td className="fw-bold">63</td>
                            <td>$2,016</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <a href="#">
                                <img src="assets/img/product-5.jpg" alt="" />
                              </a>
                            </th>
                            <td>
                              <a href="#" className="text-primary fw-bold">
                                Sit unde debitis delectus repellendus
                              </a>
                            </td>
                            <td>$79</td>
                            <td className="fw-bold">41</td>
                            <td>$3,239</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <!-- End Top Selling --> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
