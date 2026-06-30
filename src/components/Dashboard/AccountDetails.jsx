import { useState } from "react";
import { updateAccountDetails } from "../../Api/GetApi";

function AccountDetails({
  account,
  setAccount,
  editAccount,
  setEditAccount,
  accountSaving,
  setAccountSaving,
}) {
  const [message, setMessage] = useState("");

  const getUserId = () => {
    const customerId = localStorage.getItem("customer_id");
    const userId = localStorage.getItem("user_id");
    const id = localStorage.getItem("id");

    return customerId || userId || id;
  };

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");

    const userId = getUserId();

    if (!userId) {
      setMessage("User ID not found. Please login again.");
      return;
    }

    try {
      setAccountSaving(true);

      const payload = {
        user_id: userId,
        name: account.name,
        email: account.email,
      };

      console.log("Update Account Payload:", payload);

      const data = await updateAccountDetails(payload);

      console.log("Update Account Response:", data);

      if (data?.success === false) {
        setMessage(data?.message || "Account update failed.");
        return;
      }

      const updatedName =
        data?.user?.name ||
        data?.name ||
        account.name;

      const updatedEmail =
        data?.user?.email ||
        data?.email ||
        account.email;

      setAccount({
        name: updatedName,
        email: updatedEmail,
      });

      localStorage.setItem("user_name", updatedName);
      localStorage.setItem("user_email", updatedEmail);

      setEditAccount(false);
      setMessage("Account updated successfully.");
    } catch (error) {
      console.log("Account Update Error:", error);

      setMessage(
        error.response?.data?.message ||
          error.message ||
          "Account update failed."
      );
    } finally {
      setAccountSaving(false);
    }
  };

  if (!editAccount) {
    return (
      <div>
        <h2 className="text-3xl font-black mb-6">Account Details</h2>

        {message && (
          <p className="mb-4 text-sm font-bold text-green-700">
            {message}
          </p>
        )}

        <div className="bg-[#fbfaf7] rounded-2xl p-6 border border-black/5">
          <div className="mb-5">
            <label className="text-sm font-black text-neutral-500">
              Name
            </label>
            <p className="text-lg font-black mt-1">
              {account.name || "No name found"}
            </p>
          </div>

          <div className="mb-6">
            <label className="text-sm font-black text-neutral-500">
              Email
            </label>
            <p className="text-lg font-black mt-1">
              {account.email || "No email found"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setMessage("");
              setEditAccount(true);
            }}
            className="px-6 py-3 rounded-xl bg-black text-white font-black hover:bg-[#9b7423] transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-black mb-6">Edit Account Details</h2>

      {message && (
        <p className="mb-4 text-sm font-bold text-red-600">
          {message}
        </p>
      )}

      <form
        onSubmit={handleUpdate}
        className="bg-[#fbfaf7] rounded-2xl p-6 border border-black/5 space-y-5"
      >
        <div>
          <label className="text-sm font-black text-neutral-500">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={account.name || ""}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 rounded-xl border border-black/10 outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-black text-neutral-500">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={account.email || ""}
            onChange={handleChange}
            required
            className="w-full mt-2 px-4 py-3 rounded-xl border border-black/10 outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={accountSaving}
            className="px-7 py-4 rounded-xl bg-black text-white font-black hover:bg-[#9b7423] transition disabled:opacity-50"
          >
            {accountSaving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMessage("");
              setEditAccount(false);
            }}
            className="px-7 py-4 rounded-xl bg-white border border-black/10 font-black hover:bg-neutral-100 transition"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AccountDetails;