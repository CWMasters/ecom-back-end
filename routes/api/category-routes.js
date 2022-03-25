const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // see just tech dashboard routes
  Category.findAll(
    {
    include: [
      {
      model: Product,
      attributes: [
        'id', 
        'product_name', 
        'price', 
        'stock',
        'category_id'
      ],
    }]
  })
  .then(catData => res.json(catData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  // see just tech dashboard routes
  Category.findOne(
    {
    where: {
      id: req.params.id
    },
    include: [
      {
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock',
        'category_id'
      ],
    }]
  })
  .then(catData => res.json(catData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(catData => res.status(200).json(catData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }) .then(catData => {
    if(!catData) {
      res.status(404).json({ message: "No category with that id!"});
      return;
    }
    res.json(catData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      // select id to destroy
      id: req.params.id
    }
  })
  // as in /:ID
  .then(catData => {
    if(!catData) {
      res.status(404).json({ message: "No category with that id!"});
      return;
    }
    res.json(catData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});
 

module.exports = router;