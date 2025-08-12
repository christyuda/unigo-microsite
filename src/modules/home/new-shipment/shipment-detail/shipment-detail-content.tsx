import ShipmentCategorySelector from "../components/shipment-category-selector";
import ShipmentDetailForm from "../components/shipment-detail-form";

const ShipmentDetailContent = () => {
  return (
    <div className="space-y-4 bg-white px-4 pt-4 pb-8">
      <ShipmentCategorySelector />
      <ShipmentDetailForm />
    </div>
  );
};

export default ShipmentDetailContent;
