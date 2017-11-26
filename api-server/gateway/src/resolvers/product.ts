import axios from 'axios';
import { omit } from 'lodash';
import category from './category';
import * as Promise from 'q';

export default function ({ Query }) {
  this.dPrice = product =>
    this.validDiscounts(product)
      .then((discounts) => {
        if (!discounts) {
          return product.price;
        }

        let dPrice = product.price;

        discounts.forEach((discount) => {      
          dPrice = dPrice * (1 - discount.percentage / 100);
        });

        return dPrice;
      });

  this.getCategories = ({ categories }) =>
    Promise.all(categories.map(id => Query.category(undefined, { id })));
  
  this.getDiscounts = ({ discounts }) =>
    Promise.all(discounts.map(id => Query.discount(undefined, { id })));

  this.validDiscounts = product => 
    Promise.all([
      this.getDiscounts(product),
      this.getCategories(product)
        .spread((c) => {
          if (c) {
            return category({ Query }).Category.getDiscounts(c);
          }
        },
      ),
    ])
      .then((results) => {
        let result = results[0].concat(results[1]);
        const now = new Date;

        result = result.filter((discount) => {
          if (!discount || !discount.active || discount.deleted) {
            return false;
          }

          const start = new Date(discount.start);
          if (now < start) {
            return false;
          }

          const end = new Date(discount.end);
          if (now > end) {
            return false;
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
