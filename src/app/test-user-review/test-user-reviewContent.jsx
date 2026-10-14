"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckSquare,
  Send,
  CheckCircle,
  Award,
  X,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import TigerSmileyRating from "./TigerSmileyRating";
import TigerDecorations from "./TigerDecorations";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";

const commonIndianWashroomIssues = [
  { id: 1, text: "Dirty or unflushed toilets (Western or Indian)" },
  { id: 2, text: "Wet, slippery, or muddy floors" },
  { id: 3, text: "Unpleasant or strong odor" },
  { id: 4, text: "Paan / Gutka spit stains" },
  { id: 5, text: "Overflowing dustbins" },
  { id: 6, text: "General grime (stained walls, dirty mirrors)" },
  { id: 7, text: "No water in taps or for flush" },
  { id: 8, text: "Leaking taps, pipes, or cisterns" },
  { id: 9, text: "Broken or missing health faucet (jet spray)" },
  { id: 10, text: "No mug or lota available" },
  { id: 11, text: "Broken or missing toilet seat" },
  { id: 12, text: "Faulty or broken door lock/latch" },
  { id: 13, text: "Low water pressure" },
  { id: 14, text: "No hand-washing soap" },
  { id: 15, text: "No toilet paper available" },
  { id: 16, text: "Faulty hand dryer or no paper towels" },
  { id: 17, text: "Poor or no lighting" },
  { id: 18, text: "No hooks for bags or clothes" },
  { id: 19, text: "Poor ventilation (no fan or window)" },
  { id: 0, text: "No Issues" },
];

const translations = {
  en: {
    heroTitlePart1: "Your voice",
    heroTitleHighlight: "cleans",
    heroTitlePart2: "India",
    subtitle: "Help others by sharing your washroom experience.",
    ratingLabel: "Overall Rating",
    ratingRequired: "Rating is required",
    fields: {
      name: "Name",
      email: "Email",
      phone: "Phone Number",
      optional: "Optional",
      additional: "Additional Comments (Optional)",
      selectIssues: "What issues did you find? (Optional):",
      noIssues: "No Issues",
    },
    placeholders: {
      name: "Your full name",
      email: "your.email@example.com (optional)",
      phone: "10-digit mobile number",
      description: "Share more details about your experience...",
    },
    buttons: {
      submit: "Submit Review",
      submitting: "Submitting Review...",
      submitAnother: "Submit Another Review",
      close: "Close",
      shareWhatsApp: "Share on WhatsApp",
      continue: "Continue",
    },
    messages: {
      thankYou: "Thank You for Submitting!",
      thankYouDetailed:
        "Your feedback and details have been received successfully. Your contribution helps us maintain clean, hygienic, and well-managed facilities.",
      successMessage: "Your washroom review has been submitted successfully.",
      nameRequired: "Name is required",
      emailRequired: "Please enter a valid email",
      phoneInvalid: "Phone must be at least 10 digits",
      contactUpdateSuccess: "Thank you! Contact details submitted successfully.",
    },
    campaign: {
      title: "Swachh Drishti Abhiyan",
      subtitle: "Analysis Complete. Your voice helped in cleaning India.",
      description: "Help us improve public facilities by sharing your contact details!",
      enterDetails:
        "Share your details to enter our quarterly 'Swachh Sitara Awards'. Win vouchers for helping India be cleaner",
    },
    ratingLabels: {
      veryPoor: "Very Poor",
      poor: "Poor",
      belowAverage: "Below Average",
      fair: "Fair",
      average: "Average",
      good: "Good",
      veryGood: "Very Good",
      great: "Great",
      excellent: "Excellent",
      outstanding: "Outstanding",
    },
    issues: [
      "Dirty or unflushed toilets (Western or Indian)",
      "Wet, slippery, or muddy floors",
      "Unpleasant or strong odor",
      "Paan / Gutka spit stains",
      "Overflowing dustbins",
      "General grime (stained walls, dirty mirrors)",
    ],
    header: {
      inAssocWith: "IN ASSOCIATION WITH",
      saafAiTitle: "SaafAI",
      saafAiSub: "Smart Facility AI",
    },
    footer: {
      initiativeTag: "Smart Sanitation & Public Hygiene Monitoring Initiative",
      partnership: "Tadoba-Andhari Tiger Reserve × SaafAI",
    },
  },
  hi: {
    heroTitlePart1: "आपकी आवाज़",
    heroTitleHighlight: "स्वच्छ बनाती है",
    heroTitlePart2: "भारत को",
    subtitle: "अपना अनुभव साझा करके दूसरों की मदद करें।",
    ratingLabel: "कुल रेटिंग",
    ratingRequired: "रेटिंग देना अनिवार्य है",
    fields: {
      name: "नाम",
      email: "ईमेल",
      phone: "फ़ोन नंबर",
      optional: "वैकल्पिक",
      additional: "अतिरिक्त टिप्पणियाँ (वैकल्पिक)",
      selectIssues: "आपको क्या समस्याएँ मिलीं? (वैकल्पिक):",
      noIssues: "कोई समस्या नहीं",
    },
    placeholders: {
      name: "आपका पूरा नाम",
      email: "आपका.ईमेल@उदाहरण.com (वैकल्पिक)",
      phone: "10 अंकों का मोबाइल नंबर",
      description: "अपने अनुभव के बारे में और बताएं...",
    },
    buttons: {
      submit: "समीक्षा जमा करें",
      submitting: "समीक्षा जमा की जा रही है...",
      submitAnother: "दूसरी समीक्षा जमा करें",
      close: "बंद करें",
      shareWhatsApp: "व्हाट्सएप पर शेयर करें",
      continue: "आगे बढ़ें",
    },
    messages: {
      thankYou: "सबमिट करने के लिए धन्यवाद!",
      thankYouDetailed:
        "आपकी समीक्षा और संपर्क विवरण सफलतापूर्वक प्राप्त हो गए हैं। आपका सहयोग ताडोबा में स्वच्छ और उच्च-स्तरीय सुविधाएं सुनिश्चित करने में मदद करता है।",
      successMessage: "आपकी शौचालय समीक्षा सफलतापूर्वक जमा हो गई है।",
      nameRequired: "नाम आवश्यक है",
      emailRequired: "कृपया एक वैध ईमेल दर्ज करें",
      phoneInvalid: "फ़ोन कम से कम 10 अंकों का होना चाहिए",
      contactUpdateSuccess: "धन्यवाद! संपर्क विवरण सफलतापूर्वक दर्ज किया गया।",
    },
    campaign: {
      title: "स्वच्छ दृष्टि अभियान",
      subtitle: "विश्लेषण पूर्ण हुआ। आपकी आवाज़ ने भारत को स्वच्छ बनाने में मदद की।",
      description: "अपने संपर्क विवरण साझा करके सार्वजनिक सुविधाओं को बेहतर बनाने में मदद करें!",
      enterDetails:
        "हमारे त्रैमासिक ‘स्वच्छ सितारा पुरस्कार’ में भाग लेने के लिए अपनी जानकारी साझा करें।",
    },
    ratingLabels: {
      veryPoor: "बहुत खराब",
      poor: "खराब",
      belowAverage: "औसत से कम",
      fair: "ठीक",
      average: "औसत",
      good: "अच्छा",
      veryGood: "बहुत अच्छा",
      great: "बेहतरीन",
      excellent: "उत्कृष्ट",
      outstanding: "शानदार",
    },
    issues: [
      "गंदे या बिना फ्लश किए शौचालय (पश्चिमी या भारतीय)",
      "गीले, फिसलन भरे या कीचड़युक्त फर्श",
      "अप्रिय या तेज़ गंध",
      "पान / गुटखा के दाग",
      "ओवरफ्लो होते कूड़ेदान",
      "सामान्य गंदगी (दीवारों पर धब्बे, गंदे शीशे)",
    ],
    header: {
      inAssocWith: "के साथ साझेदारी में",
      saafAiTitle: "SaafAI",
      saafAiSub: "स्मार्ट सुविधा तकनीक",
    },
    footer: {
      initiativeTag: "स्मार्ट स्वच्छता एवं जन सुविधा निगरानी पहल",
      partnership: "ताडोबा-अंधारी टाइगर रिजर्व × SaafAI",
    },
  },
  mr: {
    heroTitlePart1: "तुमचा आवाज",
    heroTitleHighlight: "स्वच्छ करतो",
    heroTitlePart2: "भारत",
    subtitle: "तुमचा अनुभव शेअर करून इतरांना मदत करा.",
    ratingLabel: "एकूण रेटिंग",
    ratingRequired: "रेटिंग आवश्यक आहे",
    fields: {
      name: "नाव",
      email: "ईमेल",
      phone: "फोन नंबर",
      optional: "ऐच्छिक",
      additional: "अतिरिक्त टिप्पण्या (ऐच्छिक)",
      selectIssues: "तुम्हाला कोणत्या समस्या आढळल्या? (ऐच्छिक):",
      noIssues: "कोणतीही समस्या नाही",
    },
    placeholders: {
      name: "तुमचे पूर्ण नाव",
      email: "तुमचा.ईमेल@उदाहरण.com (ऐच्छिक)",
      phone: "10 अंकांचा मोबाइल नंबर",
      description: "तुमच्या अनुभवाबद्दल अधिक सांगा...",
    },
    buttons: {
      submit: "पुनरावलोकन सबमिट करा",
      submitting: "पुनरावलोकन सबमिट होत आहे...",
      submitAnother: "दुसरे पुनरावलोकन सबमिट करा",
      close: "बंद करा",
      shareWhatsApp: "व्हाट्सअॅपवर शेअर करा",
      continue: "पुढे जा",
    },
    messages: {
      thankYou: "सबमिट केल्याबद्दल धन्यवाद!",
      thankYouDetailed:
        "आपला अभिप्राय आणि संपर्क तपशील यशस्वीरीत्या प्राप्त झाले आहेत. आपले योगदान ताडोबा येथील स्वच्छता आणि सुविधा उत्तम राखण्यास मदत करते.",
      successMessage: "आपली शौचालय समीक्षा यशस्वीरीत्या नोंदवली गेली.",
      nameRequired: "नाव आवश्यक आहे",
      emailRequired: "कृपया वैध ईमेल टाका",
      phoneInvalid: "फोन नंबर किमान 10 अंकांचा असावा",
      contactUpdateSuccess: "धन्यवाद! संपर्क तपशील यशस्वीरित्या नोंदवले गेले.",
    },
    campaign: {
      title: "स्वच्छ दृष्टी अभियान",
      subtitle: "विश्लेषण पूर्ण झाले. आपल्या आवाजाने भारताला स्वच्छ करण्यास मदत केली.",
      description: "सार्वजनिक सुविधा सुधारण्यासाठी तुमची संपर्क माहिती शेअर करा!",
      enterDetails:
        "आमच्या त्रैमासिक ‘स्वच्छ सितारा पुरस्कार’ मध्ये सहभागी होण्यासाठी संपर्क माहिती भरा.",
    },
    ratingLabels: {
      veryPoor: "अतिशय वाईट",
      poor: "वाईट",
      belowAverage: "सरासरीपेक्षा कमी",
      fair: "ठीक",
      average: "सरासरी",
      good: "चांगले",
      veryGood: "खूप चांगले",
      great: "उत्कृष्ट",
      excellent: "अतिशय छान",
      outstanding: "सर्वोत्कृष्ट",
    },
    issues: [
      "घाण किंवा फ्लश न केलेली शौचालये",
      "ओले, निसरडे किंवा चिखलयुक्त मजले",
      "दुर्गंधी किंवा तीव्र वास",
      "पान / गुटख्याचे डाग",
      "ओव्हरफ्लो कचराकुंड्या",
      "भिंतीवरील डाग, घाणेरडे आरसे",
    ],
    header: {
      inAssocWith: "च्या सहकार्याने",
      saafAiTitle: "SaafAI",
      saafAiSub: "स्मार्ट सुविधा AI",
    },
    footer: {
      initiativeTag: "स्मार्ट स्वच्छता आणि सार्वजनिक आरोग्य देखरेख उपक्रम",
      partnership: "ताडोबा-अंधारी व्याघ्र प्रकल्प × SaafAI",
    },
  },
};

// Submission Confirmation Modal (Token number hidden as requested)
const NatureSuccessModal = ({
  isOpen,
  onClose,
  reviewData,
  lang,
  onSubmitWithDetails,
}) => {
  const [step, setStep] = useState(1);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const t = translations[lang].campaign;
  const tMsg = translations[lang].messages;
  const tBtn = translations[lang].buttons;

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setContactDetails({
        name: "",
        email: "",
        phone: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen || !reviewData) return null;

  const validateContactForm = () => {
    const newErrors = {};
    if (!contactDetails.name.trim()) newErrors.name = tMsg.nameRequired;
    // Email is optional - only validate format if entered
    if (contactDetails.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactDetails.email.trim())) {
      newErrors.email = tMsg.emailRequired;
    }
    if (!contactDetails.phone.trim()) {
      newErrors.phone = tMsg.phoneInvalid;
    } else if (contactDetails.phone.trim().length < 10) {
      newErrors.phone = tMsg.phoneInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateContactForm()) {
      const success = await onSubmitWithDetails(contactDetails);
      if (success) {
        setStep(2);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-[95%] xs:max-w-md sm:max-w-lg my-auto overflow-hidden flex flex-col max-h-[90vh]">
        {/* Forest Green Header */}
        <div className="relative bg-gradient-to-r from-[#20402f] to-[#284e3a] p-5 sm:p-7 text-white flex-shrink-0 text-center">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white/15 rounded-full mb-2">
            <Award className="h-7 w-7 text-emerald-200" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-1">{t.title}</h2>
          <p className="text-emerald-100 text-xs sm:text-sm">
            {step === 2
              ? lang === "hi"
                ? "आपकी प्रतिक्रिया सफलतापूर्वक प्राप्त हुई"
                : lang === "mr"
                ? "आपला अभिप्राय यशस्वीरीत्या प्राप्त झाला"
                : "Submission Complete"
              : t.subtitle}
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
          {step === 1 ? (
            <>
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-[#284e3a] mx-auto mb-2" />
                <p className="text-gray-800 text-base sm:text-lg font-semibold">
                  {tMsg.successMessage}
                </p>
              </div>

              {/* Note: Token number is intentionally hidden as requested */}

              <div className="text-center bg-emerald-50/70 border border-emerald-200/60 p-4 rounded-2xl">
                <p className="text-emerald-950 text-xs sm:text-sm font-medium leading-relaxed">
                  {t.enterDetails}
                </p>
              </div>

              <div className="space-y-3.5">
                <div>
                  <label className="flex items-center text-xs font-semibold text-gray-700 mb-1.5">
                    <User className="h-3.5 w-3.5 mr-1.5 text-[#284e3a]" />
                    {translations[lang].fields.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactDetails.name}
                    onChange={(e) =>
                      setContactDetails({ ...contactDetails, name: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#284e3a] focus:border-transparent text-black"
                    placeholder={translations[lang].placeholders.name}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="flex items-center text-xs font-semibold text-gray-700 mb-1.5">
                    <Mail className="h-3.5 w-3.5 mr-1.5 text-[#284e3a]" />
                    {translations[lang].fields.email} ({translations[lang].fields.optional || "Optional"})
                  </label>
                  <input
                    type="email"
                    value={contactDetails.email}
                    onChange={(e) =>
                      setContactDetails({ ...contactDetails, email: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#284e3a] focus:border-transparent text-black"
                    placeholder={translations[lang].placeholders.email}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="flex items-center text-xs font-semibold text-gray-700 mb-1.5">
                    <Phone className="h-3.5 w-3.5 mr-1.5 text-[#284e3a]" />
                    {translations[lang].fields.phone} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={contactDetails.phone}
                    onChange={(e) =>
                      setContactDetails({
                        ...contactDetails,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      })
                    }
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#284e3a] focus:border-transparent text-black"
                    placeholder={translations[lang].placeholders.phone}
                    maxLength={10}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#284e3a] text-white py-3 px-5 rounded-xl hover:bg-[#1e3a29] transition-all font-medium flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <span>{tBtn.continue}</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center py-6 space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-1">
                  <CheckCircle className="h-10 w-10 text-[#284e3a]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {translations[lang]?.messages?.thankYou || "Thank You!"}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                  {translations[lang]?.messages?.thankYouDetailed ||
                    "Thank you for submitting! Your contribution helps us maintain clean and hygienic facilities."}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-[#284e3a] hover:bg-[#1e3a29] text-white py-3.5 px-5 rounded-xl font-bold text-sm sm:text-base transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  {translations[lang]?.buttons?.close || "Close"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function TestReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [lang, setLang] = useState("en");
  const [submittedReviewId, setSubmittedReviewId] = useState(null);

  const searchParams = useSearchParams();
  const rawLocationId = searchParams.get("locationId");
  const locMatch = rawLocationId ? rawLocationId.toString().match(/\d+/) : null;
  const locationId = locMatch ? locMatch[0] : "2080";

  const rawCompanyId = searchParams.get("companyId");
  const compMatch = rawCompanyId ? rawCompanyId.toString().match(/\d+/) : null;
  const companyId = compMatch ? compMatch[0] : "93";

  const [rating, setRating] = useState(0);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [description, setDescription] = useState("");
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://daily-dash-backend-development.vercel.app/api";

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReasonToggle = (reasonId) => {
    const updated = selectedReasons.includes(reasonId)
      ? selectedReasons.filter((id) => id !== reasonId)
      : [...selectedReasons.filter((id) => id !== 0), reasonId];

    setSelectedReasons(updated);
  };

  const handleNoIssuesToggle = () => {
    if (selectedReasons.includes(0)) {
      setSelectedReasons([]);
    } else {
      setSelectedReasons([0]);
    }
  };

  const submitReview = async (data) => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("rating", data.rating.toString());
      formData.append("description", data.description || "");
      formData.append("reason_ids", JSON.stringify(data.reasonids));
      formData.append("location_id", locationId);
      if (companyId) {
        formData.append("companyId", companyId);
      }

      const res = await fetch(`${API_URL}/qr-reviews/user-review`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || result.message || "Failed to submit review");
      }

      const reviewId = result.reviewId || result.data?.id;
      if (reviewId) setSubmittedReviewId(reviewId);

      setReviewData({
        rating: data.rating,
        reasonids: data.reasonids,
        description: data.description,
      });

      toast.success(result.message || "Review submitted successfully!");
      return true;
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.message || "Failed to submit review");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    const data = {
      rating,
      description,
      reasonids: selectedReasons,
    };

    const success = await submitReview(data);
    if (success) {
      setShowSuccessPopup(true);
      setRating(0);
      setSelectedReasons([]);
      setDescription("");
      setSubmittedOnce(false);
    }
  };

  const submitReviewWithContactDetails = async (contactDetails) => {
    if (!submittedReviewId) return false;

    try {
      const res = await fetch(
        `${API_URL}/qr-reviews/user-review/${submittedReviewId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: contactDetails.name.trim(),
            email: contactDetails.email.trim(),
            phone: contactDetails.phone.trim(),
          }),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Failed to update contact details");
      }

      toast.success(
        translations[lang].messages.contactUpdateSuccess ||
          "Contact details updated successfully!"
      );
      return true;
    } catch (err) {
      toast.error(err.message || "Failed to update contact details");
      return false;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#faf8f4] font-sans flex flex-col justify-start items-center sm:py-6 sm:px-3">
        <div className="w-full max-w-[640px] mx-auto">
          {/* Main Card with rounded corners and subtle shadow */}
          <div className="relative bg-[#faf8f4] sm:rounded-3xl sm:shadow-lg sm:border sm:border-stone-200/70 overflow-hidden">
            {/* TOP HEADER: Institutional Co-Brand Bar */}
            <div className="relative z-10 bg-white px-3.5 py-3 sm:px-8 sm:py-4 border-b border-stone-150">
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                {/* Partner Logos Strip: strictly ONE line on all mobile screens */}
                <div className="flex items-center justify-between sm:justify-start gap-2 xs:gap-3.5 sm:gap-6 flex-nowrap w-full sm:w-auto min-w-0">
                  {/* Tadoba TATR Logo */}
                  <div className="flex items-center flex-shrink-0">
                    <Image
                      src="/tadoba_logo.jpeg"
                      alt="Tadoba-Andhari Tiger Reserve"
                      width={96}
                      height={96}
                      className="h-11 xs:h-12 sm:h-16 w-auto object-contain"
                      priority
                    />
                  </div>

                  {/* Association Divider */}
                  <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 flex-shrink-0">
                    <div className="h-7 sm:h-10 w-px bg-stone-200"></div>
                    <span className="text-[8px] xs:text-[10px] sm:text-xs font-semibold tracking-wider text-stone-400 uppercase text-center whitespace-nowrap">
                      {translations[lang]?.header?.inAssocWith || "IN ASSOCIATION WITH"}
                    </span>
                    <div className="h-7 sm:h-10 w-px bg-stone-200"></div>
                  </div>

                  {/* SaafAI Clean Text Logo */}
                  <div className="flex items-center justify-center flex-shrink-0 select-none">
                    <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
                      Saaf<span className="text-[#00A3E0]">AI</span>
                    </div>
                  </div>
                </div>

                {/* Segmented Language Selector Pill */}
                <div className="flex items-center justify-center sm:justify-end self-center sm:self-auto bg-stone-50 border border-stone-200 rounded-xl p-0.5 gap-0.5 shadow-2xs">
                  {["en", "hi", "mr"].map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => setLang(l)}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        lang === l
                          ? "bg-[#284e3a] text-white font-bold shadow-xs"
                          : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* HERO BANNER SECTION with Exact Tiger Banner */}
            <div className="relative z-10 w-full overflow-hidden bg-[#faf8f5] select-none border-b border-stone-200/60">
              <Image
                src="/tadoba_banner_new.png"
                alt="Your voice cleans India - Tadoba-Andhari Tiger Reserve"
                width={1024}
                height={287}
                className="w-full h-auto block object-cover"
                priority
              />
            </div>

            {/* REVIEW FORM BODY WITH SUBTLE NATURE DECORATIONS */}
            <div className="relative">
              <TigerDecorations />

              <form onSubmit={handleFormSubmit} className="relative z-10 px-6 py-7 sm:px-9 sm:py-8 space-y-7 pb-8 sm:pb-9">
              {/* 1. OVERALL RATING SECTION */}
              <div>
                <label className="block text-sm font-bold text-stone-900 mb-3">
                  {translations[lang].ratingLabel}{" "}
                  <span className="text-red-500">*</span>
                </label>

                {/* 10 Circular Ratings with #10 Tiger face */}
                <TigerSmileyRating
                  rating={rating}
                  onRatingChange={handleRatingChange}
                  ratingLabels={translations[lang].ratingLabels}
                />

                {(submittedOnce && rating === 0) && (
                  <p className="text-orange-600 text-xs font-semibold mt-2 text-center sm:text-left">
                    {translations[lang].ratingRequired}
                  </p>
                )}
              </div>

              {/* 2. WHAT ISSUES DID YOU FIND SECTION */}
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div
                    onClick={() => {
                      if (selectedReasons.includes(0)) {
                        setSelectedReasons([]);
                      }
                    }}
                    className={`flex items-center gap-2 text-sm font-bold text-stone-900 ${
                      selectedReasons.includes(0) ? "cursor-pointer" : ""
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center transition-all ${
                        !selectedReasons.includes(0)
                          ? "bg-[#284e3a] text-white text-[10px]"
                          : "border border-stone-300 bg-white"
                      }`}
                    >
                      {!selectedReasons.includes(0) && "✓"}
                    </div>
                    <span>{translations[lang].fields.selectIssues}</span>
                  </div>

                  {/* No Issues Checkbox */}
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedReasons.includes(0)}
                      onChange={handleNoIssuesToggle}
                      className="h-4 w-4 text-[#284e3a] rounded border-stone-300 focus:ring-[#284e3a] accent-[#284e3a]"
                    />
                    <span className="text-sm font-semibold text-stone-800">
                      {translations[lang].fields.noIssues}
                    </span>
                  </label>
                </div>

                {/* Issues Grid (2 columns on tablet/desktop, 1 on mobile) */}
                {!selectedReasons.includes(0) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {translations[lang].issues.map((issueText, index) => {
                      const reasonId = commonIndianWashroomIssues[index].id;
                      const isChecked = selectedReasons.includes(reasonId);

                      return (
                        <label
                          key={reasonId}
                          className={`flex items-start space-x-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isChecked
                              ? "bg-emerald-50/80 border-[#284e3a]/60 shadow-xs"
                              : "bg-white/90 border-stone-200/90 hover:bg-stone-50/80 hover:border-stone-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleReasonToggle(reasonId)}
                            className="mt-0.5 h-4 w-4 rounded text-[#284e3a] border-stone-300 focus:ring-[#284e3a] accent-[#284e3a]"
                          />
                          <span className="text-xs sm:text-sm font-medium text-stone-700 leading-snug">
                            {issueText}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. ADDITIONAL COMMENTS SECTION */}
              <div>
                <label className="flex items-center text-sm font-bold text-stone-900 mb-2">
                  <MessageSquare className="h-4 w-4 mr-1.5 text-stone-700" />
                  {translations[lang].fields.additional}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-[#284e3a] focus:border-[#284e3a] resize-none text-stone-900 bg-white/90 placeholder-stone-400 text-sm"
                  placeholder={translations[lang].placeholders.description}
                />
              </div>

              {/* 4. SUBMIT REVIEW BUTTON (Deep Forest Green) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#284e3a] hover:bg-[#1f3f2e] text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-center space-x-2 text-base sm:text-lg shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                    <span>{translations[lang].buttons.submitting}</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 rotate-45" />
                    <span>{translations[lang].buttons.submit}</span>
                  </>
                )}
              </button>
            </form>
          </div>

            {/* CLEAN BOTTOM FOOTER BAR */}
            <div className="relative z-10 bg-white/95 border-t border-stone-150 px-5 py-3 sm:px-8">
              <div className="flex items-center justify-center gap-1.5 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-[#284e3a] flex-shrink-0" />
                <span className="font-semibold text-stone-700">
                  {translations[lang]?.footer?.initiativeTag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal (Token number is hidden) */}
      <NatureSuccessModal
        isOpen={showSuccessPopup}
        onClose={() => {
          setShowSuccessPopup(false);
          setReviewData(null);
        }}
        reviewData={reviewData}
        lang={lang}
        onSubmitWithDetails={submitReviewWithContactDetails}
      />
    </>
  );
}
