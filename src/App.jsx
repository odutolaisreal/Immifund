import React, { useState, useEffect } from "react";
import {
  Heart,
  Globe,
  Wallet,
  Plus,
  Search,
  Filter,
  Users,
  DollarSign,
  Clock,
  Target,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

const ImmifundApp = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [copied, setCopied] = useState(false);

  // Mock campaigns data
  const mockCampaigns = [
    {
      id: 1,
      title: "Emergency Medical Treatment for My Mother",
      description:
        "My mother needs urgent surgery but we cannot afford the medical costs. As recent immigrants, we're struggling to make ends meet while she battles this illness.",
      category: "medical",
      creator: "Maria Rodriguez",
      target: 5000,
      raised: 2340,
      donors: 23,
      timeLeft: "12 days",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
      story:
        "We arrived in this country three years ago with hopes of a better life. My mother worked two jobs to support our family, but recently she was diagnosed with a serious condition requiring immediate surgery. The medical bills are overwhelming, and we're reaching out to the global community for help.",
      walletAddress: "0x742d35Cc6634C0532925a3b8D6B9C94c3c0b4123",
    },
    {
      id: 2,
      title: "Educational Support for Refugee Children",
      description:
        "Helping refugee children access quality education and school supplies in their new country.",
      category: "education",
      creator: "Ahmed Hassan",
      target: 3000,
      raised: 1850,
      donors: 31,
      timeLeft: "8 days",
      image:
        "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=200&fit=crop",
      story:
        "After fleeing conflict in our homeland, we want to ensure our children don't lose their chance at education. We need funds for school supplies, uniforms, and tutoring to help them catch up with their peers.",
      walletAddress: "0x841f53Dd7722d4c9832b4c0f3f1e2a8e5d9c3456",
    },
    {
      id: 3,
      title: "Legal Documentation and Immigration Fees",
      description:
        "Raising funds to complete legal immigration processes and secure permanent residency for my family.",
      category: "legal",
      creator: "Carlos Mendoza",
      target: 4500,
      raised: 980,
      donors: 12,
      timeLeft: "20 days",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=200&fit=crop",
      story:
        "We've been waiting for years to complete our immigration process. The legal fees and documentation costs are substantial, but this is our chance to finally become permanent residents and build a secure future for our children.",
      walletAddress: "0x923e17Aa6789b1c2d3e4f5g6h7i8j9k0l1m2n3o4",
    },
    {
      id: 4,
      title: "Housing Deposit for Displaced Family",
      description:
        "Need help securing a safe home for my family after being displaced due to economic hardship.",
      category: "housing",
      creator: "Fatima Al-Rashid",
      target: 2800,
      raised: 1200,
      donors: 18,
      timeLeft: "15 days",
      image:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=200&fit=crop",
      story:
        "We lost our home due to unexpected circumstances and are currently staying in temporary shelter. We need help with a security deposit and first month's rent to secure stable housing for our three children.",
      walletAddress: "0x456b89Cc1234d5e6f7g8h9i0j1k2l3m4n5o6p7q8",
    },
  ];

  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, []);

  // Wallet connection simulation
  const connectWallet = async () => {
    try {
      // Simulate wallet connection
      const mockAddress = "0x742d35Cc6634C0532925a3b8D6B9C94c3c0b4123";
      setWalletAddress(mockAddress);
      setIsWalletConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setIsWalletConnected(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || campaign.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDonate = (campaignId) => {
    if (!isWalletConnected) {
      alert("Please connect your wallet first to make a donation");
      return;
    }
    if (!donationAmount || donationAmount <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    // Simulate donation process
    alert(
      `Donation of ${donationAmount} USDC initiated! Transaction will be processed via smart contract.`
    );
    setDonationAmount("");
  };

  const CreateCampaignForm = () => {
    const [formData, setFormData] = useState({
      title: "",
      description: "",
      category: "medical",
      target: "",
      story: "",
      image: "",
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!isWalletConnected) {
        alert("Please connect your wallet to create a campaign");
        return;
      }

      const newCampaign = {
        id: campaigns.length + 1,
        ...formData,
        creator: walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4),
        raised: 0,
        donors: 0,
        timeLeft: "30 days",
        walletAddress: walletAddress,
      };

      setCampaigns([...campaigns, newCampaign]);
      setUserCampaigns([...userCampaigns, newCampaign]);
      setShowCreateForm(false);
      setFormData({
        title: "",
        description: "",
        category: "medical",
        target: "",
        story: "",
        image: "",
      });
      alert("Campaign created successfully!");
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Campaign
            </h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter campaign title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="medical">Medical</option>
                <option value="education">Education</option>
                <option value="legal">Legal</option>
                <option value="housing">Housing</option>
                <option value="emergency">Emergency</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Funding Goal (USDC)
              </label>
              <input
                type="number"
                required
                value={formData.target}
                onChange={(e) =>
                  setFormData({ ...formData, target: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
                placeholder="Brief description of your campaign"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Story
              </label>
              <textarea
                required
                value={formData.story}
                onChange={(e) =>
                  setFormData({ ...formData, story: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                placeholder="Tell your story in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (optional)
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Create Campaign
            </button>
          </form>
        </div>
      </div>
    );
  };

  const CampaignCard = ({ campaign, isPreview = false }) => {
    const progressPercentage = (campaign.raised / campaign.target) * 100;

    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium capitalize">
            {campaign.category}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {campaign.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {campaign.description}
          </p>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-semibold text-gray-700">
                ${campaign.raised.toLocaleString()} / $
                {campaign.target.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {campaign.donors} donors
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {campaign.timeLeft}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedCampaign(campaign)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              View Details
            </button>
            {isWalletConnected && (
              <button
                onClick={() => {
                  setSelectedCampaign(campaign);
                  setDonationAmount("");
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                Donate
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CampaignModal = ({ campaign, onClose }) => {
    if (!campaign) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
            >
              ×
            </button>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {campaign.title}
                </h2>
                <p className="text-gray-600 mb-4">By {campaign.creator}</p>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold text-gray-700">
                      ${campaign.raised.toLocaleString()} raised
                    </span>
                    <span className="text-lg font-semibold text-gray-700">
                      ${campaign.target.toLocaleString()} goal
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                      style={{
                        width: `${Math.min(
                          (campaign.raised / campaign.target) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{campaign.donors} donors</span>
                    <span>{campaign.timeLeft} left</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    Campaign Story
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {campaign.story}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Donation Address
                  </h4>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-white px-3 py-2 rounded border flex-1">
                      {campaign.walletAddress}
                    </code>
                    <button
                      onClick={() => copyToClipboard(campaign.walletAddress)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:w-80">
                <div className="bg-gray-50 rounded-2xl p-6 sticky top-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Make a Donation
                  </h3>

                  {!isWalletConnected ? (
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">
                        Connect your wallet to donate
                      </p>
                      <button
                        onClick={connectWallet}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                      >
                        Connect Wallet
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount (USDC)
                        </label>
                        <input
                          type="number"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter amount"
                        />
                      </div>

                      <div className="flex space-x-2 mb-4">
                        {[10, 25, 50, 100].map((amount) => (
                          <button
                            key={amount}
                            onClick={() => setDonationAmount(amount.toString())}
                            className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                          >
                            ${amount}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handleDonate(campaign.id)}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200"
                      >
                        Donate Now
                      </button>

                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Secure donation via smart contract
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl">
                <Globe className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Immifund
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              {isWalletConnected ? (
                <div className="flex items-center space-x-2">
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Connected
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectWallet}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "explore", label: "Explore Campaigns", icon: Search },
              { id: "create", label: "Create Campaign", icon: Plus },
              { id: "my-campaigns", label: "My Campaigns", icon: Heart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "explore" && (
          <div>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Supporting Immigrants Worldwide
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Help immigrants overcome urgent challenges through secure,
                transparent crowdfunding with stablecoins
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="medical">Medical</option>
                <option value="education">Education</option>
                <option value="legal">Legal</option>
                <option value="housing">Housing</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "create" && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Create Your Campaign
              </h2>
              <p className="text-gray-600">
                Share your story and get support from the global community
              </p>
            </div>

            {!isWalletConnected ? (
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Connect Your Wallet
                </h3>
                <p className="text-gray-600 mb-6">
                  You need to connect your wallet to create a campaign and
                  receive donations
                </p>
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                <Plus className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Ready to Create
                </h3>
                <p className="text-gray-600 mb-6">
                  Your wallet is connected. Click below to create your campaign.
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Create Campaign
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "my-campaigns" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              My Campaigns
            </h2>
            {userCampaigns.length === 0 ? (
              <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Campaigns Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  You haven't created any campaigns yet. Start by creating your
                  first campaign.
                </p>
                <button
                  onClick={() => setActiveTab("create")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Create First Campaign
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showCreateForm && <CreateCampaignForm />}
      {selectedCampaign && (
        <CampaignModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  );
};

export default ImmifundApp;
