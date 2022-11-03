const Network = require("../models/networkSchema");

module.exports = class networkAPI {
  static async getNetwork(req, res) {
    try {
      const network = await Network.find();
      var status;
      if (network.every((node) => node.status === "Online")) {
        status = "online";
      }
      if (network.every((node) => node.status === "Offline")) {
        status = "offline";
      }
      if (network.some((node) => node.status === "Online") && network.some((node) => node.status === "Offline")) {
        status = "Partial Outage";
      }

      res.status(200).json({
        network: {
          nodes: network,
          networkStatus: status,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createNetwork(req, res) {
    const newNode = req.body;

    try {
      await Network.create(newNode);
      res.status(201).json({ message: "Node added" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  static async deleteNetwork(req, res) {
    const { id } = req.params;
    try {
      await Network.findByIdAndDelete(id);
      res.status(200).json({ message: "Node deleted successfully" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  static async deleteAllNetwork(req, res) {
    try {
      await Network.deleteMany();
      res.status(200).json({ message: "All Nodes deleted successfully" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
};
