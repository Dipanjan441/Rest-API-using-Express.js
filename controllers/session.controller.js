export const sessionSetController = (req, res) => {
  if (req.session.page_view) {
    req.session.page_view++;
    res.send(`You have visited this page for ${req.session.page_view} times`);
  } else {
    req.session.page_view = 1;
    res.send("You have visited this page for the first time");
  }
};

export const sessionClearController = (req, res) => {
  req.session.destroy();
  res.send("sessions are removed");
};
