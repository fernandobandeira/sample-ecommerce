import axios from 'axios';
import { omit } from 'lodash';
import category from './category';
import * as Promise from 'q';

export default function ({ Query }) {
  this.categories = ({ categories }) =>
    Promise.all(categories.map(id => Query.category(undefined, { id })));
  
  this.discounts = ({ discounts }) =>
    Promise.all(discounts.map(id => Query.discount(undefined, { id })));

  this.validDiscounts = product => 
    Promise.all([
      this.discounts(product),
      this.categories(product)
        .spread((c) => {
          if (c) {
            return category({ Query }).Category.discounts(c);
          }
        },
      ),
    ])
      .then((results) => {
        let result = results[0].concat(results[1]);
        const now = new Date;

        result = result.filter((discount) => {
          if (!discount || !discount.active) {
            return false;
          }

          const start = new Date(discount.start);
          if (now < start) {
            return false;
          }

          if (discount.end !== null) {
            const end = new Date(discount.end);

            if (now > end) {
              return false;
            }
          }

          return true;
        });
        
        return result.length > 0 ? result : undefined;
      });

  return {
    Product: {
      ...omit(this, 'default'),
    },
  };
}
