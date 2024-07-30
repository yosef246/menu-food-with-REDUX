import currencyFormatter from "../Util/formatting";
import Button from "./UI/button";
import { cartActions } from "../store/CartContext";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

function MealItem(props) {
  const dispatch = useDispatch();

  const { id, name, price, description, image } = props.meal;

  function handleAddmealToCart() {
    dispatch(cartActions.addItem({ id, name, price }));
  }

  return (
    <motion.li
      whileHover={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="meal-item"
    >
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(price)}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddmealToCart}>Add to Cart</Button>
        </p>
      </article>
    </motion.li>
  );
}
export default MealItem;
