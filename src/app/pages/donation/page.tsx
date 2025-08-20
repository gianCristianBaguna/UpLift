import { Heart, Shield, Users, CheckCircle, QrCode, Copy } from "lucide-react";
import Shell from "@/components/navbar/shell";
import Footer from "@/components/navbar/footer";

export default function DonationPage() {
  const donationAmounts = [100, 250, 500, 1000, 2500, 5000];

  return (
    <main className="min-h-screen bg-white">
      <Shell>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-orange-50 to-blue-50 mt-20">
          <div className="container mx-auto px-4 text-center">
            <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
              Making a Difference Together
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Every Donation Creates
              <span className="text-orange-600 block">Lasting Impact</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of compassionate individuals who are transforming
              lives through their generosity. Your contribution, no matter the
              size, makes a real difference.
            </p>
          </div>
        </section>

        {/* Donation Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Choose Your Donation Amount
                </h2>
                <p className="text-gray-600">
                  Select an amount or enter a custom donation
                </p>
              </div>

              <div className="grid md:grid-cols-1 gap-8 w-full">
                {/* Donation Form */}
                {/* Payment Options */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* GCash QR Code */}
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <div className="pb-4 border-b border-gray-100 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <QrCode className="h-5 w-5 text-orange-600" />
                        GCash Payment
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Scan the QR code to donate via GCash
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                          <img
                            src="/gcash-donation-qr.png"
                            alt="GCash QR Code for Donations"
                            className="w-48 h-48"
                          />
                        </div>
                      </div>

                      <div className="text-center space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-900">
                            GCash Number
                          </p>
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <span className="font-mono text-lg">
                              09XX-XXX-XXXX
                            </span>
                            <button className="h-6 w-6 p-0 hover:bg-gray-100 rounded">
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                          <Shield className="h-4 w-4 text-orange-600" />
                          Secure and verified payment method
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">
                          How to donate:
                        </h5>
                        <ol className="text-sm text-gray-600 space-y-1">
                          <li>1. Open your GCash app</li>
                          <li>2. Scan the QR code above</li>
                          <li>3. Enter your donation amount</li>
                          <li>4. Complete the transaction</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Maya QR Code */}
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <div className="pb-4 border-b border-gray-100 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <QrCode className="h-5 w-5 text-green-600" />
                        Maya Payment
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Scan the QR code to donate via Maya
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                          <img
                            src="/maya-donation-qr.png"
                            alt="Maya QR Code for Donations"
                            className="w-48 h-48"
                          />
                        </div>
                      </div>

                      <div className="text-center space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-900">
                            Maya Number
                          </p>
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <span className="font-mono text-lg">
                              09XX-XXX-XXXX
                            </span>
                            <button className="h-6 w-6 p-0 hover:bg-gray-100 rounded">
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                          <Shield className="h-4 w-4 text-green-600" />
                          Secure and verified payment method
                        </div>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">
                          How to donate:
                        </h5>
                        <ol className="text-sm text-gray-600 space-y-1">
                          <li>1. Open your Maya app</li>
                          <li>2. Scan the QR code above</li>
                          <li>3. Enter your donation amount</li>
                          <li>4. Complete the transaction</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* GoTyme QR Code */}
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <div className="pb-4 border-b border-gray-100 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-2">
                        <QrCode className="h-5 w-5 text-purple-600" />
                        GoTyme Payment
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Scan the QR code to donate via GoTyme
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                          <img
                            src="/gotyme-donation-qr.png"
                            alt="GoTyme QR Code for Donations"
                            className="w-48 h-48"
                          />
                        </div>
                      </div>

                      <div className="text-center space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-900">
                            GoTyme Account
                          </p>
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <span className="font-mono text-lg">
                              09XX-XXX-XXXX
                            </span>
                            <button className="h-6 w-6 p-0 hover:bg-gray-100 rounded">
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
                          <Shield className="h-4 w-4 text-purple-600" />
                          Secure and verified payment method
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">
                          How to donate:
                        </h5>
                        <ol className="text-sm text-gray-600 space-y-1">
                          <li>1. Open your GoTyme app</li>
                          <li>2. Scan the QR code above</li>
                          <li>3. Enter your donation amount</li>
                          <li>4. Complete the transaction</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Impact So Far
              </h2>
              <p className="text-gray-600">
                Together, we've made a real difference
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm text-center p-6">
                <div className="pt-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    15,000+
                  </div>
                  <div className="text-gray-600">Families Helped</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm text-center p-6">
                <div className="pt-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    ₱2.5M
                  </div>
                  <div className="text-gray-600">Total Donations</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm text-center p-6">
                <div className="pt-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600">Active Donors</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why Donate With Us?
                </h2>
                <p className="text-gray-600">
                  Your trust and transparency are our priorities
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    100% Secure
                  </h3>
                  <p className="text-gray-600">
                    All transactions are encrypted and secure
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Direct Impact
                  </h3>
                  <p className="text-gray-600">
                    100% of donations go directly to beneficiaries
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Verified
                  </h3>
                  <p className="text-gray-600">
                    Registered and verified charitable organization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer></Footer>
      </Shell>
    </main>
  );
}
