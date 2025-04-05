// Interface cho dữ liệu từ API
interface IDiary {
    id: number;
    name: string;
    dailyDiaries: {
      id: number;
      content: string;
      eventDate: string;
    }[];
  }