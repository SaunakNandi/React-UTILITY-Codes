export const mockBackendSchema = {
  personal_details: {
    name: "Personal Details",
    inputs: [
      {
        type: "text",
        label: "Last Name",
        placeholder: "Enter your last name",
        value: "",
        name: "last_name",
        id: "last_name",
        required: true,
      },
    ],
  },
  contact_details: {
    name: "Contact Details",
    inputs: [
      {
        type: "text",
        label: "Email",
        placeholder: "Enter your email",
        value: "",
        name: "email",
        id: "email",
        required: true,
      },
      {
        type: "text",
        label: "Phone Number",
        placeholder: "Enter phone number",
        value: "",
        name: "phone",
        id: "phone",
        required: false,
      },
    ],
  },
  extra: {
    name: "Additional Info",
    inputs: [
      {
        type: "checkbox",
        label: "Accept Terms & Conditions",
        checked: false,
        name: "accept_terms",
        id: "accept_terms",
        required: true,
      },
    ],
  },
};
