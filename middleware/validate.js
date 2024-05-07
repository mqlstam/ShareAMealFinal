const validateUser = (req, res, next) => {
    const { firstName, lastName, emailAddress, password } = req.body;
  
    // Validate firstName
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
      return res.status(400).json({ message: 'Invalid first name' });
    }
  
    // Validate lastName
    if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
      return res.status(400).json({ message: 'Invalid last name' });
    }
  
    // Validate emailAddress
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailAddress || typeof emailAddress !== 'string' || !emailRegex.test(emailAddress)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
  
    // Validate password
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!password || typeof password !== 'string' || !passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Invalid password' });
    }
  
    next();
  };
  
  const validateMeal = (req, res, next) => {
    const { name, description, price, dateTime, maxAmountOfParticipants, imageUrl } = req.body;
  
    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ message: 'Invalid meal name' });
    }
  
    // Validate description
    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return res.status(400).json({ message: 'Invalid meal description' });
    }
  
    // Validate price
    if (!price || typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ message: 'Invalid meal price' });
    }
  
    // Validate dateTime
    if (!dateTime || !(dateTime instanceof Date) || isNaN(dateTime.getTime())) {
      return res.status(400).json({ message: 'Invalid meal date and time' });
    }
  
    // Validate maxAmountOfParticipants
    if (!maxAmountOfParticipants || typeof maxAmountOfParticipants !== 'number' || maxAmountOfParticipants < 1) {
      return res.status(400).json({ message: 'Invalid maximum number of participants' });
    }
  
    // Validate imageUrl
    const imageUrlRegex = /^https?:\/\/.*\/(.+)\.(jpg|jpeg|png|gif|bmp)$/;
    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrlRegex.test(imageUrl)) {
      return res.status(400).json({ message: 'Invalid meal image URL' });
    }
  
    next();
  };
  
  module.exports = { validateUser, validateMeal };