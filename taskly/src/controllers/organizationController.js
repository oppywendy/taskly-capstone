const Organization = require("../models/organization");
const User = require("../models/user");

exports.createOrganization = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;
    const organization = new Organization({
      name,
      ownerId: userId,
      members: [userId]
    });
    await organization.save();

    const user = await User.findById(userId);
    user.organizationId = organization._id;
    user.role = "owner";
    await user.save();

    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const organizationId = req.params.organizationId;

    const organization = await Organization.findById(organizationId);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    const user = await User.findById(userId);
    user.organizationId = organizationId;
    user.role = "member";
    await user.save();

    organization.members.push(userId);
    await organization.save();

    res.status(200).json({ message: "User added to organization successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
