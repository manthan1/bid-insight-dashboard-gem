
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
  return bids.map(bid => bid as StateBid);
}
