
export interface Bid {
  bid_id: number;
  bid_number: string;
  category: string;
  quantity: number;
  start_date: string;
  end_date: string;
  ministry: string;
  department: string;
}

// Sample bids data
export const bids: Bid[] = [
  {
    bid_id: 1,
    bid_number: "GEM/2024/B/3241890",
    category: "Office Supplies",
    quantity: 250,
    start_date: "2024-04-01T00:00:00.000Z",
    end_date: "2024-05-01T00:00:00.000Z",
    ministry: "Ministry of Finance",
    department: "Department of Revenue"
  },
  {
    bid_id: 2,
    bid_number: "GEM/2024/B/3241891",
    category: "IT Equipment",
    quantity: 50,
    start_date: "2024-04-05T00:00:00.000Z",
    end_date: "2024-05-05T00:00:00.000Z",
    ministry: "Ministry of Electronics and IT",
    department: "Department of IT Infrastructure"
  },
  {
    bid_id: 3,
    bid_number: "GEM/2024/B/3241892",
    category: "Furniture",
    quantity: 30,
    start_date: "2024-04-10T00:00:00.000Z",
    end_date: "2024-05-10T00:00:00.000Z",
    ministry: "Ministry of Home Affairs",
    department: "Department of Personnel"
  },
  {
    bid_id: 4,
    bid_number: "GEM/2024/B/3241893",
    category: "Laboratory Equipment",
    quantity: 10,
    start_date: "2024-04-15T00:00:00.000Z",
    end_date: "2024-05-15T00:00:00.000Z",
    ministry: "Ministry of Science and Technology",
    department: "Department of Scientific Research"
  },
  {
    bid_id: 5,
    bid_number: "GEM/2024/B/3241894",
    category: "Medical Supplies",
    quantity: 1000,
    start_date: "2024-04-20T00:00:00.000Z",
    end_date: "2024-05-20T00:00:00.000Z",
    ministry: "Ministry of Health",
    department: "Department of Medical Services"
  },
  {
    bid_id: 6,
    bid_number: "GEM/2024/B/3241895",
    category: "Construction Materials",
    quantity: 500,
    start_date: "2024-04-25T00:00:00.000Z",
    end_date: "2024-05-25T00:00:00.000Z",
    ministry: "Ministry of Urban Development",
    department: "Department of Infrastructure"
  },
  {
    bid_id: 7,
    bid_number: "GEM/2024/B/3241896",
    category: "Vehicles",
    quantity: 5,
    start_date: "2024-05-01T00:00:00.000Z",
    end_date: "2024-06-01T00:00:00.000Z",
    ministry: "Ministry of Defense",
    department: "Department of Defense Acquisition"
  },
  {
    bid_id: 8,
    bid_number: "GEM/2024/B/3241897",
    category: "Books and Publications",
    quantity: 300,
    start_date: "2024-05-05T00:00:00.000Z",
    end_date: "2024-06-05T00:00:00.000Z",
    ministry: "Ministry of Education",
    department: "Department of Higher Education"
  },
  {
    bid_id: 9,
    bid_number: "GEM/2024/B/3241898",
    category: "Agricultural Equipment",
    quantity: 25,
    start_date: "2024-05-10T00:00:00.000Z",
    end_date: "2024-06-10T00:00:00.000Z",
    ministry: "Ministry of Agriculture",
    department: "Department of Agricultural Research"
  },
  {
    bid_id: 10,
    bid_number: "GEM/2024/B/3241899",
    category: "Telecommunications Equipment",
    quantity: 100,
    start_date: "2024-05-15T00:00:00.000Z",
    end_date: "2024-06-15T00:00:00.000Z",
    ministry: "Ministry of Communications",
    department: "Department of Telecommunications"
  }
];

// Example of how to import from the blank JSON file when needed:
// import blankBids from './blank-bids.json';
// export const customBids: Bid[] = blankBids as Bid[];
