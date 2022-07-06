export interface Transaction {
  id: number;
  patient_id: string;
  patient_name: string;
  service_id: string;
  service_type: string;
  service_price: Number;
  speciality_id: string;
  speciality_type: string;
  disease_id: string;
  disease_type: string;
  transaction_date: Date;
  transaction_description: string;
  transaction_amount: number;
}
