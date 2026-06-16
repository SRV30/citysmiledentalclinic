import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  updateTestimonialStatus,
  deleteTestimonial
} from "@/store/home/testimonial";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2, CheckCircle, XCircle, User, MessageSquare, Edit3, Image as ImageIcon, Sparkles } from "lucide-react";
import { CircularProgress } from "@mui/material";

const AdminTestimonials = () => {
  const dispatch = useDispatch();
  const { testimonials, loading } = useSelector((state) => state.testimonial);

  // Form State
  const [patientName, setPatientName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // UI State
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getAdminTestimonials());
  }, [dispatch]);

  const resetForm = () => {
    setPatientName("");
    setRating(5);
    setComment("");
    setAvatar("");
    setIsFeatured(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setPatientName(item.patientName);
    setRating(item.rating);
    setComment(item.comment);
    setAvatar(item.avatar || "");
    setIsFeatured(item.isFeatured || false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName || !comment) {
      return toast.error("Please fill in all required fields");
    }

    const testimonialData = { patientName, rating, comment, avatar, isFeatured };

    if (editingId) {
      const res = await dispatch(updateTestimonial({ id: editingId, testimonialData }));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Testimonial updated successfully");
        resetForm();
      }
    } else {
      const res = await dispatch(createTestimonial(testimonialData));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Testimonial added to moderation queue");
        resetForm();
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const res = await dispatch(updateTestimonialStatus({ id, isApproved: !currentStatus }));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success(`Testimonial ${!currentStatus ? 'approved' : 'hidden'} successfully`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      const res = await dispatch(deleteTestimonial(id));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Testimonial deleted");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 mt-10">
      <header className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Testimonial Management
        </h2>
        <p className="text-slate-500 text-lg">Moderate and manage patient feedback for your clinic.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-12 items-start">

        {/* Form Section */}
        <section className="lg:col-span-1 sticky top-24">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 shadow-2xl shadow-slate-200 rounded-[2.5rem] border border-slate-100"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              {editingId ? <Edit3 className="text-amber-500" /> : <MessageSquare className="text-blue-600" />}
              {editingId ? 'Edit Review' : 'Add Review'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Patient Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Patient Avatar (URL)
                </label>
                <div className="relative">
                    <input
                    type="text"
                    placeholder="https://image-url.com"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:bg-white transition-all"
                    />
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Rating
                </label>
                <div className="flex items-center gap-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none transform transition-transform active:scale-90"
                    >
                      <Star
                        className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Experience
                </label>
                <textarea
                  placeholder="Share the patient's feedback..."
                  rows="4"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:bg-white transition-all resize-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isFeatured" className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Featured Review
                </label>
              </div>

              <div className="flex gap-3">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className={`flex-[2] py-4 rounded-2xl font-bold text-white transition-all shadow-xl shadow-slate-200 active:scale-95 ${editingId ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-900 hover:bg-blue-600'}`}
                >
                  {editingId ? 'Update Review' : 'Add Testimonial'}
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* List Section */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Patient Feedback Queue</h3>
            <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
              {testimonials.length} Total
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <CircularProgress size={40} thickness={5} className="text-blue-600" />
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence mode='popLayout'>
                {testimonials.map((item) => (
                  <motion.div
                    key={item._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border flex flex-col md:flex-row gap-6 items-start md:items-center group transition-colors ${editingId === item._id ? 'border-amber-200 ring-4 ring-amber-50' : 'border-slate-100'}`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 overflow-hidden ring-1 ring-slate-100">
                      {item.avatar ? (
                          <img src={item.avatar} alt={item.patientName} className="w-full h-full object-cover" />
                      ) : (
                          <User size={32} />
                      )}
                    </div>

                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h4 className="text-xl font-extrabold text-slate-900">{item.patientName}</h4>
                        <div className="flex gap-0.5">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="flex gap-2">
                            {item.isApproved ? (
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-100">Approved</span>
                            ) : (
                            <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-amber-100">Pending</span>
                            )}
                            {item.isFeatured && (
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100 flex items-center gap-1">
                                    <Sparkles size={10} /> Featured
                                </span>
                            )}
                        </div>
                      </div>
                      <p className="text-slate-600 leading-relaxed italic">"{item.comment}"</p>
                      <p className="text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-tighter">
                        Submitted: {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex md:flex-col gap-3 w-full md:w-auto">
                      <button
                        onClick={() => handleToggleStatus(item._id, item.isApproved)}
                        className={`flex-1 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all active:scale-90 ${
                          item.isApproved
                            ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                        title={item.isApproved ? "Hide from website" : "Approve for website"}
                      >
                        {item.isApproved ? <XCircle size={20} /> : <CheckCircle size={20} />}
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 md:w-12 md:h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-90"
                        title="Edit testimonial"
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex-1 md:w-12 md:h-12 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90"
                        title="Delete testimonial"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {testimonials.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">No testimonials found in the queue.</p>
                </div>
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default AdminTestimonials;
