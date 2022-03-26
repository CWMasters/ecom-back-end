const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // copy from category-routes, change data type to tag, attributes for product
  Tag.findAll(
    {
      include: [
        {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock']
        }]
  })
  .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  // Where for id (see product-routes) // copy from category-routes, change data type to tag
  Tag.findOne(
    {
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock']
        }]
  })
  .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// copy from category-routes. change data type to tag
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    // Category.create(req.body)
    .then(tagData => res.status(200).json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

// copy from category-routes, change data type to tag
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }) .then(tagData => {
    if(!tagData) {
      res.status(404).json({ message: "No category with that id!"});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

// copy from category-routes, change data type to tag
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      // select id to destroy
      id: req.params.id
    }
  })
  // as in /:ID
  .then(tagData => {
    if(!tagData) {
      res.status(404).json({ message: "No category with that id!"});
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

module.exports = router;