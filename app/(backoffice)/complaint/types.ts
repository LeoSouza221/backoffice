type ComplaintStatus = 'NOT_ANSWERED' | 'ANSWERED' | 'EVALUATED'

interface IComplaintTableProps {
  status: ComplaintStatus
  filters: IFilterItems 
}

interface IFilterItems {
  player: string
  dateEnd: string
  dateStart: string
  casino: string
  complaintId: string
}

interface IFilterMenuProps {
  handleFilterComplaint: (filters: IFilterItems) => void
}

export type { ComplaintStatus, IComplaintTableProps, IFilterItems, IFilterMenuProps }