import axios from "axios";

class ApiClient {
  axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  constructor() {}

  handleError(error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `API Error: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`
        );
      }
      if (error.request) {
        throw new Error("API Error: No response received from server");
      }
      throw new Error(`API Error: ${error.message}`);
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(String(error));
    }
  }

  // Moc Payload Data
  // {
  //   "fullName": "Jane Doe",
  //   "phoneNumber": "+12331212343125678190",
  //   "telegramUsername": "@j31231an1242131e_doe1",
  //   "instagramLink": "https://instagram.com/jane.doe"
  // }
  async createSpeakerApplication(payload) {
    const { data } = await this.axiosInstance.post("/speakers", payload);
    return data.data;
  }

  async createHelperUserFormApplication(payload) {
    const { data } = await this.axiosInstance.post("/helperusers", payload)
    return data.data;
  }

  // Moc Payload Data
  // {
  //   "companyName": "Tech Solutions Ltd.",
  //   "contactPerson": "Ivan Ivanov",
  //   "contactInfo": "+380 123 456 7890",
  //   "telegramNick": "Ivan_Ivan",
  //   "instagramLink": "https://www.instagram.com/techsolutions"
  // }
  async createPartnerApplication(payload) {
    const { data } = await this.axiosInstance.post("/partners", payload);
    return data.data;
  }

  async createPayment(payload) {
    const { data } = await this.axiosInstance.post("/create-payment", payload);
    return data;
  }

  async getInvoiceById(id) {
    const { data } = await this.axiosInstance.get(`/invoices/${id}`);
    return data;
  }

  async sendTicketOnMailByInvoiceId(id) {
    const { data } = await this.axiosInstance.post(
      `/invoices/sendTicket/${id}`
    );
    return data;
  }
}

const api = new ApiClient();

export default api;
