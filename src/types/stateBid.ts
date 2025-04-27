
export interface StateBid {
  serial_no: string;
  start_date: string;
  end_date: string;
  open_date: string;
  title: string;
  link: string;
  location: string;
  department: string;
}

export function mapToStateBids(bids: any[]): StateBid[] {
  return bids.map(bid => ({
    serial_no: bid.serial_no,
    start_date: bid.start_date,
    end_date: bid.end_date,
    open_date: bid.open_date,
    title: bid.title,
    link: bid.link,
    location: bid.location,
    department: bid.department,
  }));
}

