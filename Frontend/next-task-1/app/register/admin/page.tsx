export default function AdminRegister() {
  return (
    <>
      <div className="max-w-md mx-auto bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Admin Registration</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}
