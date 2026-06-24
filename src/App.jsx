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

  const mockCampaigns = [
    {
      id: 1,
      title: "Against Cancer: NATASHA's Fight",
      description:
        "At just 14, NATASHA is fighting for her life against cancer. Help us raise the remaining $27,600 for life-saving treatments.",
      category: "medical",
      creator: "Family of NATASHA",
      target: 27600,
      raised: 8450,
      donors: 87,
      timeLeft: "18 days",
      image: "cancer.png",
      story:
        "Dear Friends, Family, and Kind Strangers,\n\nAt just 14 years old, NATASHA should be worrying about high school, hanging out with her friends, and just enjoying being a kid. Instead, she is fighting for her life against cancer.\n\nWatching someone so young, vibrant, and full of dreams face such a brutal disease is heartbreaking. Throughout endless rounds of treatment, hospital stays, and painful days, NATASHA has shown unimaginable bravery. She still smiles through the pain, but the emotional and financial toll on our family has reached a breaking point.\n\nWe have managed to cover a significant portion of her medical expenses, but we have hit a wall. We urgently need to raise the remaining balance of $27,600 to ensure her ongoing, life-saving treatments are not interrupted.\n\nEvery single dollar raised goes directly toward her medical bills, specialized therapies, and care. If you cannot donate, please consider sharing her story. No family should have to choose between their child's health and financial ruin. Thank you from the bottom of our hearts for your love, prayers, and support.",
      walletAddress: "bc1q85zscwjq4ctry3v8wptada5rg5j3xl49xp0c7g",
    },
    {
      id: 2,
      title: "Rebuilding After the Flood: Louisiana",
      description:
        "A devastating flood swept through Louisiana, destroying our home. Help us raise the final $15,700 to rebuild and find stability.",
      category: "housing",
      creator: "Flood Survivor Family",
      target: 15700,
      raised: 3800,
      donors: 42,
      timeLeft: "22 days",
      image: "flood.png",
      story:
        "Dear Community,\n\nAfter the flood our lives changed forever. A devastating Flood swept through LOUISIANA, and in a matter of moments, the place we called home was reduced to nothing.\n\nWe lost everything our clothes, our cherished family photos, our security, and the roof over our heads. It is a surreal and devastating feeling to stand in front of where your life used to be and see only rubble.\n\nWhile we are incredibly grateful that our family is safe, the road to rebuilding from scratch is daunting. Insurance and initial relief have helped us take the first few steps, but we are facing a critical gap. We need to raise a final balance of $15,700 to secure permanent housing, replace essential household necessities, and finally establish stability for all family again.\n\nWe are a hardworking family who is used to helping others, and it is incredibly humbling to be the ones asking for help. Any contribution, big or small, will directly help us put the pieces of our lives back together. Thank you for standing with us during our darkest hour.",
      walletAddress: "bc1q85zscwjq4ctry3v8wptada5rg5j3xl49xp0c7g",
    },
    {
      id: 3,
      title: "Maria's Dream: College Tuition for a DACA Recipient",
      description:
        "Maria arrived in the US at age 5 and has worked hard to earn a university scholarship — but tuition gaps and ineligibility for federal aid threaten to end her dream before it begins.",
      category: "education",
      creator: "Rodriguez Family",
      target: 18500,
      raised: 6200,
      donors: 134,
      timeLeft: "31 days",
      image: "https://unsplash.com/photos/man-sitting-on-surface-F8sCVSW4t4E?w=800&q=80&auto=format&fit=crop",
      story:
        "Dear Supporters,\n\nMy name is Maria. I was brought to the United States from Mexico when I was just 5 years old. This is the only country I have ever truly known. I grew up speaking English, attending American schools, and dreaming the same dreams as every other kid on my block.\n\nThrough years of hard work, I managed to earn a partial academic scholarship to study nursing at a public university. But as a DACA recipient, I am not eligible for federal student aid, and my family — two hardworking parents who clean offices at night — simply cannot cover the remaining $18,500 gap in tuition, housing, and textbooks.\n\nNursing is not just a career choice for me. After watching my grandmother struggle to communicate with doctors who did not speak Spanish, I made a promise to become the bridge that families like mine desperately need. I want to serve immigrant and underserved communities as a bilingual nurse.\n\nThis campaign is my last hope to make that promise a reality. Every dollar you give does not just pay a tuition bill — it invests in the future health of communities that are too often left behind. Thank you for believing in me.",
      walletAddress: "bc1q85zscwjq4ctry3v8wptada5rg5j3xl49xp0c7g",
    },
   {
  "id": 4,
  "title": "Stop the Deportation: Legal Defense for the Martinez Family",
  "description": "After 13 years building their lives in the US, the Martinez family — including two American-born children — faces deportation. We need $22,000 to fund their immigration attorney and court appeals.",
  "category": "legal",
  "creator": "Friends of the Martinez Family",
  "target": 22000,
  "raised": 9750,
  "donors": 211,
  "timeLeft": "14 days",
  "image": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80&auto=format&fit=crop",
  "story": "Dear Neighbors and Allies,\n\nCarlos and Elena Martinez have called the United States home since 2011. Over the past 13 years, they have built a life here through hard work and dedication. Carlos manages a landscaping business that employs 12 local workers. Elena works as a certified nursing assistant at a senior care facility, where she's known for her compassion and reliability. They own their home, pay their taxes, volunteer at their community center, and are raising two children — both born right here in the United States.\n\nThey are our neighbors. Their kids play on the same soccer teams as our kids. They organize the annual block party and are always the first to help when someone in the neighborhood needs assistance. This family is part of the very fabric of our community.\n\nIn early 2024, their immigration application was denied on a procedural technicality — not on the merits of their case. They now have just weeks before a removal order is enforced. Their two American-born children — ages 6 and 10 — would either be uprooted from the only home they have ever known, or forced to separate from their parents.\n\nAn experienced immigration attorney has reviewed their case and believes there are strong grounds for appeal, including evidence that was never properly entered into the record and updated documentation that could change the outcome entirely. But the legal process is expensive. We need $22,000 to cover attorney fees, filing costs, and emergency court motions.\n\nWe are not asking for charity. We are asking you to help keep a family together. No child should have to choose between their country and their parents. Please give what you can and share their story widely — time is everything.",
  "walletAddress": "bc1q85zscwjq4ctry3v8wptada5rg5j3xl49xp0c7g"
},
    {
      id: 5,
      title: "Fresh Start: Afghan Refugee Family's First Home",
      description:
        "After fleeing Taliban violence, the Ahmadi family arrived in the US with nothing but the clothes on their backs. Help them furnish a home and cover three months of rent while they find their footing.",
      category: "emergency",
      creator: "Local Resettlement Network",
      target: 12000,
      raised: 4300,
      donors: 98,
      timeLeft: "27 days",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
      story:
        "Dear Community,\n\nIn August 2021, Yusuf Ahmadi — a former interpreter who worked alongside U.S. forces for nearly a decade — was forced to flee Afghanistan with his wife Fatima and their two young sons when the Taliban took Kabul. The journey was harrowing: days in hiding, a desperate scramble to the airport, and months in overcrowded transit camps before finally being welcomed to the United States.\n\nYusuf risked his life to serve alongside American soldiers because he believed in a future worth fighting for. Now, that future is here — but it comes with enormous practical challenges. The family arrived with no belongings, no furniture, and no savings. Government resettlement assistance covers only 90 days of basic support, and it is simply not enough.\n\nThey have been placed in a small apartment in a welcoming city, but it sits completely empty. Fatima, who is trained as a teacher, is enrolled in an ESL program and working toward a teaching credential. Yusuf is studying for a commercial driver's license. They are doing everything right — but they need a bridge to get there.\n\nThis campaign will fund three months of rent, basic furniture, a used car for transportation to work and school, and winter clothing for the boys. Every contribution is a vote of confidence that says: your sacrifice was not forgotten, and your family deserves a real chance.",
      walletAddress: "bc1q85zscwjq4ctry3v8wptada5rg5j3xl49xp0c7g",
    },
    {
      id: 6,
      title: "Heart Surgery for Abuela Rosa: A Family's Last Hope",
      description:
        "Rosa, 71, emigrated from Guatemala 30 years ago and raised four children who are all U.S. citizens. Now she needs urgent open-heart surgery but has no insurance and her family cannot cover the $35,000 cost.",
      category: "medical",
      creator: "The Velasquez Family",
      target: 35000,
      raised: 11800,
      donors: 163,
      timeLeft: "10 days",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
      story:
        "Dear Generous Strangers,\n\nOur grandmother, Rosa Velasquez, is 71 years old and has spent three decades building a life in this country. She came from Guatemala with almost nothing and worked double shifts as a hotel housekeeper for 25 years to put her four children through school. Every one of them is now a U.S. citizen. Two are nurses. One is a teacher. One runs a small restaurant that employs twelve people.\n\nAbuela Rosa — that is what the whole neighborhood calls her — is the foundation our entire family was built on. Last month, she was diagnosed with severe aortic stenosis and her cardiologist says she needs open-heart surgery within the next few weeks or she will not survive the year.\n\nBecause of her immigration status, she does not qualify for Medicare or Medicaid. She has no health insurance. The surgery costs $35,000, and while our family has managed to raise $11,800 by pooling everything we have, we cannot cover the rest in time.\n\nWe are not ready to lose her. Her grandchildren are not ready to lose her. Please help us give Rosa the chance to meet a few more of them. Any amount you can give brings us one step closer to saving her life. We will be grateful for every single dollar — and for every prayer — for the rest of our lives.",
      walletAddress: "bc1q85zscwjq4ctry3v8wptada5rg5j3xl49xp0c7g",
    },
  ];

  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, []);

  const connectWallet = async () => {
    try {
      const mockAddress = "bc1q85zscwjq4ctry3v8wptada5rg5j3xl49xp0c7g";
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
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/400x200?text=Image";
            }}
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
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x300?text=Image";
              }}
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
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {campaign.story}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">
                    Donation Address
                  </h4>
                  <div className="flex items-center space-x-2">
                    <code className="text-sm bg-white px-3 py-2 rounded border flex-1 break-all">
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
                  <button
                    onClick={disconnectWallet}
                    className="text-gray-700 hover:text-gray-900 font-medium"
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
