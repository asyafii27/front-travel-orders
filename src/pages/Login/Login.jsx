import { useState } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_API_BASE_URL; // Jika menggunakan Vite
// const baseUrl = process.env.REACT_APP_API_BASE_URL; // Jika menggunakan Create React App



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Untuk menampilkan loading
  const [error, setError] = useState(""); // Untuk menyimpan pesan error
  const navigate = useNavigate();  // Hook untuk navigasi

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error saat login ulang

    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal, coba lagi.");
      }

      // Jika login berhasil
      alert("Login berhasil!");
      localStorage.setItem("token", data.token); // Simpan token ke localStorage
      navigate("/dashboard");  // Redirect ke Dashboard setelah login sukses
    } catch (err) {
      setError(err.message); // Simpan pesan error
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a href="index.html" className="logo d-flex align-items-center w-auto">
                    <img src="assets/img/logo.png" alt="Logo" />
                    <span className="d-none d-lg-block">NiceAdmin</span>
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                      <p className="text-center small">Enter your email & password to login</p>
                    </div>

                    {/* Menampilkan error jika ada */}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <form className="row g-3 needs-validation" onSubmit={handleLogin} noValidate>
                      <div className="col-12">
                        <label htmlFor="yourEmail" className="form-label">Email</label>
                        <div className="input-group has-validation">
                          <span className="input-group-text">@</span>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="yourEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <div className="invalid-feedback">Please enter your email.</div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label htmlFor="yourPassword" className="form-label">Password</label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">Please enter your password!</div>
                      </div>

                      <div className="col-12">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="remember" id="rememberMe" />
                          <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                          {loading ? "Logging in..." : "Login"}
                        </button>
                      </div>

                      <div className="col-12">
                        <p className="small mb-0">
                          Don't have an account? <a href="pages-register.html">Create an account</a>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="credits">
                  Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main >
  );
};

export default LoginPage;
