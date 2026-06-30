import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiMapPin, FiPlus } from "react-icons/fi";
import EmptyState from "./EmptyState";
import { getCountries, getStates } from "../../api/checkoutApi";

function AddressSection({ savedAddresses = [], setSavedAddresses }) {
  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postal: "",
    country: "IN",
  };

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [selectedId, setSelectedId] = useState(savedAddresses?.[0]?.id || null);
  const [showForm, setShowForm] = useState(savedAddresses.length === 0);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const [popup, setPopup] = useState({
    show: false,
    type: "",
    address: null,
    title: "",
    text: "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();

        let finalCountries = [];

        if (Array.isArray(data)) {
          finalCountries = data;
        } else if (data && typeof data === "object") {
          finalCountries = Object.entries(data).map(([code, name]) => ({
            code,
            name,
          }));
        }

        setCountries(finalCountries);
      } catch (error) {
        console.log("Countries Error:", error);
        setCountries([]);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!form.country) {
      setStates([]);
      return;
    }

    const fetchStates = async () => {
      try {
        const data = await getStates(form.country);

        console.log("States Data:", data);

        let finalStates = [];

        if (Array.isArray(data)) {
          finalStates = data;
        } else if (data && typeof data === "object") {
          finalStates = Object.entries(data).map(([code, name]) => ({
            code,
            name,
          }));
        }

        setStates(finalStates);
      } catch (error) {
        console.log("States Error:", error);
        setStates([]);
      }
    };

    fetchStates();
  }, [form.country]);

  const saveToStorage = (addresses) => {
    setSavedAddresses(addresses);
    localStorage.setItem("checkout_addresses", JSON.stringify(addresses));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
      ...(name === "country" ? { state: "" } : {}),
    });
  };

  const handleAddNew = () => {
    setForm(emptyForm);
    setEditId(null);
    setSelectedId(null);
    setShowForm(true);
  };

  const handleSelect = (address) => {
    setSelectedId(address.id);
  };

  const handleEdit = (address) => {
    setPopup({
      show: true,
      type: "edit",
      address,
      title: "Edit Address",
      text: "Are you sure you want to edit this address?",
    });
  };

  const confirmEdit = () => {
    const address = popup.address;

    setForm({
      firstName: address.firstName || "",
      lastName: address.lastName || "",
      email: address.email || "",
      phone: address.phone || "",
      address: address.address || address.street || "",
      city: address.city || "",
      state: address.state || "",
      postal: address.postal || address.postcode || "",
      country: address.country || "IN",
    });

    setEditId(address.id);
    setSelectedId(address.id);
    setShowForm(true);
    closePopup();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setPopup({
      show: true,
      type: editId ? "update" : "save",
      address: null,
      title: editId ? "Update Address" : "Save Address",
      text: editId
        ? "Are you sure you want to update this address?"
        : "Are you sure you want to save this address?",
    });
  };

  const confirmSaveOrUpdate = () => {
    let updatedAddresses = [];

    if (editId) {
      updatedAddresses = savedAddresses.map((item) =>
        item.id === editId ? { ...form, id: editId } : item
      );

      setSelectedId(editId);
    } else {
      const newAddress = {
        ...form,
        id: Date.now(),
      };

      updatedAddresses = [newAddress, ...savedAddresses];
      setSelectedId(newAddress.id);
    }

    saveToStorage(updatedAddresses);
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    closePopup();
  };

  const handleDelete = (address) => {
    setPopup({
      show: true,
      type: "delete",
      address,
      title: "Delete Address",
      text: "Are you sure you want to delete this address?",
    });
  };

  const confirmDelete = () => {
    const deleteId = popup.address.id;
    const updated = savedAddresses.filter((item) => item.id !== deleteId);

    saveToStorage(updated);

    if (selectedId === deleteId) {
      setSelectedId(updated?.[0]?.id || null);
    }

    if (updated.length === 0) {
      setShowForm(true);
    }

    closePopup();
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: "",
      address: null,
      title: "",
      text: "",
    });
  };

  const handleConfirm = () => {
    if (popup.type === "edit") confirmEdit();
    if (popup.type === "save" || popup.type === "update") confirmSaveOrUpdate();
    if (popup.type === "delete") confirmDelete();
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[#9b7423] font-black uppercase tracking-widest text-xs">
            Saved Addresses
          </span>

          <h2 className="text-3xl font-black mt-2">Checkout Addresses</h2>
        </div>

        <button
          type="button"
          onClick={handleAddNew}
          className="px-5 py-3 rounded-full bg-black text-white font-black hover:bg-[#D6BA72] hover:text-black transition flex items-center gap-2"
        >
          <FiPlus /> Add New
        </button>
      </div>

      {savedAddresses.length === 0 && !showForm ? (
        <EmptyState
          title="No Address Found"
          text="After adding an address during checkout, it will appear here."
          icon={<FiMapPin />}
        />
      ) : (
        savedAddresses.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                onClick={() => handleSelect(address)}
                className={`p-6 rounded-[30px] border cursor-pointer transition-all ${
                  selectedId === address.id
                    ? "border-2 border-[#D6BA72] bg-gradient-to-br from-[#fff8e8] to-white shadow-[0_20px_50px_rgba(214,186,114,0.25)]"
                    : "border-black/10 bg-[#fafafa] hover:border-[#D6BA72]"
                }`}
              >
                <div className="flex justify-between gap-3">
                  <h3 className="font-black text-lg">
                    {address.firstName} {address.lastName}
                  </h3>

                  {selectedId === address.id && (
                    <span className="h-fit text-[10px] font-black text-black bg-[#D6BA72] px-3 py-1 rounded-full">
                      SELECTED
                    </span>
                  )}
                </div>

                <p className="text-sm text-neutral-600 mt-3 leading-6">
                  {address.address || address.street}, {address.city},{" "}
                  {address.state}, {address.postal || address.postcode}
                </p>

                <p className="text-sm text-neutral-600 mt-1">
                  {address.country}
                </p>

                {address.email && (
                  <p className="text-sm text-neutral-600 mt-1">
                    Email: {address.email}
                  </p>
                )}

                <p className="text-sm text-neutral-600 mt-1">
                  Phone: {address.phone}
                </p>

                <div className="flex gap-3 mt-5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(address);
                    }}
                    className="px-4 py-2 rounded-full bg-black text-white font-bold text-sm flex items-center gap-2"
                  >
                    <FiEdit /> Edit
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(address);
                    }}
                    className="px-4 py-2 rounded-full border border-black/20 font-bold text-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition flex items-center gap-2"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[#fbfaf7] rounded-[32px] p-6 border border-black/5"
        >
          <h3 className="text-2xl font-black mb-5">
            {editId ? "Edit Address" : "Add Address"}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <InputBox
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />

            <InputBox
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />

            <InputBox
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <InputBox
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <div className="sm:col-span-2">
              <InputBox
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <InputBox
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />

            <InputBox
              label="Postal Code"
              name="postal"
              value={form.postal}
              onChange={handleChange}
            />

            <SelectBox
              label="Country"
              name="country"
              value={form.country}
              onChange={handleChange}
              options={countries}
              placeholder="Select Country"
            />

            <SelectBox
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              options={states}
              placeholder={states.length > 0 ? "Select State" : "No States Found"}
            />
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              type="submit"
              className="px-7 py-4 rounded-xl bg-black text-white font-black hover:bg-[#9b7423] transition"
            >
              {editId ? "Update Address" : "Save Address"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditId(null);
                setForm(emptyForm);
              }}
              className="px-7 py-4 rounded-xl bg-white border border-black/10 font-black hover:bg-neutral-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {popup.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="text-2xl font-black mb-3">{popup.title}</h3>

            <p className="text-neutral-600 mb-6">{popup.text}</p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleConfirm}
                className="flex-1 py-3 rounded-xl bg-black text-white font-black hover:bg-[#9b7423] transition"
              >
                Yes
              </button>

              <button
                type="button"
                onClick={closePopup}
                className="flex-1 py-3 rounded-xl bg-neutral-100 text-black font-black hover:bg-neutral-200 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InputBox({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-black text-neutral-500">{label}</label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required
        className="w-full mt-2 px-4 py-3 rounded-xl border border-black/10 outline-none bg-white"
      />
    </div>
  );
}

function SelectBox({ label, name, value, onChange, options = [], placeholder }) {
  return (
    <div>
      <label className="text-sm font-black text-neutral-500">{label}</label>

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        required
        className="w-full mt-2 px-4 py-3 rounded-xl border border-black/10 outline-none bg-white"
      >
        <option value="">{placeholder}</option>

        {options.map((item, index) => (
          <option
            key={item.code || item.id || index}
            value={item.code || item.id || item.name || ""}
          >
            {item.name || item.label || item.code}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AddressSection;