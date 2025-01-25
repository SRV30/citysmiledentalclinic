import { getContactForms } from "@/store/home/contact";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminContact = () => {
  const dispatch = useDispatch();

  const contactFetch = useSelector((state) => state.contact);
  const { loading, error, contacts } = contactFetch;

  useEffect(() => {
    dispatch(getContactForms());
  }, [dispatch]);

  const limitedContacts = contacts
    ? contacts.slice(0, 50).sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  return (
    <div className="adminContactContainer rounded-lg shadow-xl p-8">
      <h2 className="font-bold text-3xl mb-6 text-blue-600">
        <br />
        Contact Form Submissions
      </h2>
      {loading && <CircularProgress />}
      {error && <p className="text-red-300">{error}</p>}
      {limitedContacts.length > 0 && (
        <div className="mt-6">
          <h3 className="font-bold text-2xl mb-4 text-yellow-900">
            Latest Submissions
          </h3>
          <ul>
            {limitedContacts.map((contact) => (
              <li key={contact.id} className="mb-4">
                <div className="bg-white p-5 rounded-lg shadow-lg transform transition hover:scale-105">
                  <p className="font-bold text-purple-800">{contact.name}</p>
                  <p>Email: {contact.email}</p>
                  <p>Phone: {contact.phone}</p>
                  <p>Message: {contact.message}</p>
                  <p className="text-gray-600 text-sm">
                    Submitted on {new Date(contact.date).toLocaleDateString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {limitedContacts.length === 0 && !loading && (
        <p className="text-white">No contact form submissions found.</p>
      )}
    </div>
  );
};

export default AdminContact;
