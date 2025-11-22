/**
 * Mock Airalo eSIM Service
 * 
 * Simulates Airalo API for eSIM provisioning.
 * Returns realistic mock data for development.
 * 
 * When ready to use real Airalo:
 * 1. Add AIRALO_CLIENT_ID and AIRALO_CLIENT_SECRET to .env
 * 2. Set USE_MOCK_AIRALO=false
 */

const USE_MOCK = process.env.USE_MOCK_AIRALO !== 'false';

interface EsimPlan {
  id: string;
  title: string;
  country: string;
  region?: string;
  dataAmount: number; // in GB
  validityDays: number;
  price: number;
  currency: string;
  description: string;
}

interface PurchaseParams {
  planId: string;
  quantity?: number;
}

interface EsimOrder {
  id: string;
  planId: string;
  iccid: string;
  qrCode: string;
  activationCode: string;
  status: 'pending' | 'active' | 'expired';
  expiresAt: Date;
}

class MockAiraloService {
  private mockPlans: EsimPlan[] = [
    {
      id: 'ae-5gb-30d',
      title: 'UAE 5GB - 30 Days',
      country: 'United Arab Emirates',
      dataAmount: 5,
      validityDays: 30,
      price: 12.99,
      currency: 'USD',
      description: 'Perfect for Dubai vacation',
    },
    {
      id: 'id-10gb-30d',
      title: 'Indonesia 10GB - 30 Days',
      country: 'Indonesia',
      dataAmount: 10,
      validityDays: 30,
      price: 15.99,
      currency: 'USD',
      description: 'Ideal for Bali getaway',
    },
    {
      id: 'jp-8gb-15d',
      title: 'Japan 8GB - 15 Days',
      country: 'Japan',
      dataAmount: 8,
      validityDays: 15,
      price: 18.99,
      currency: 'USD',
      description: 'Explore Tokyo and beyond',
    },
    {
      id: 'pk-3gb-30d',
      title: 'Pakistan 3GB - 30 Days',
      country: 'Pakistan',
      dataAmount: 3,
      validityDays: 30,
      price: 9.99,
      currency: 'USD',
      description: 'Stay connected in Pakistan',
    },
    {
      id: 'global-20gb-30d',
      title: 'Global 20GB - 30 Days',
      country: 'Global',
      region: '140+ countries',
      dataAmount: 20,
      validityDays: 30,
      price: 49.99,
      currency: 'USD',
      description: 'Works in 140+ countries worldwide',
    },
  ];

  /**
   * List available eSIM plans
   */
  async listPlans(filters?: { country?: string; minData?: number }): Promise<EsimPlan[]> {
    if (USE_MOCK) {
      let plans = [...this.mockPlans];

      if (filters?.country) {
        plans = plans.filter(
          (p) =>
            p.country.toLowerCase().includes(filters.country!.toLowerCase()) ||
            p.region?.toLowerCase().includes(filters.country!.toLowerCase())
        );
      }

      if (filters?.minData) {
        plans = plans.filter((p) => p.dataAmount >= filters.minData!);
      }

      return plans;
    }

    // Real Airalo API call would go here
    throw new Error('Real Airalo API not implemented yet. Set USE_MOCK_AIRALO=true');
  }

  /**
   * Get specific plan details
   */
  async getPlan(planId: string): Promise<EsimPlan | null> {
    if (USE_MOCK) {
      return this.mockPlans.find((p) => p.id === planId) || null;
    }

    throw new Error('Real Airalo API not implemented yet');
  }

  /**
   * Purchase an eSIM
   */
  async purchaseEsim(params: PurchaseParams): Promise<EsimOrder> {
    if (USE_MOCK) {
      const plan = await this.getPlan(params.planId);
      if (!plan) {
        throw new Error('Plan not found');
      }

      const iccid = this.generateMockICCID();
      const activationCode = this.generateMockActivationCode();

      return {
        id: `order_mock_${Date.now()}`,
        planId: params.planId,
        iccid,
        qrCode: this.generateQRCodeUrl(iccid, activationCode),
        activationCode,
        status: 'pending',
        expiresAt: new Date(Date.now() + plan.validityDays * 24 * 60 * 60 * 1000),
      };
    }

    throw new Error('Real Airalo API not implemented yet');
  }

  /**
   * Get eSIM order status
   */
  async getOrderStatus(orderId: string): Promise<EsimOrder> {
    if (USE_MOCK) {
      // Mock: return as active after "purchase"
      return {
        id: orderId,
        planId: 'ae-5gb-30d',
        iccid: this.generateMockICCID(),
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=MOCK_ESIM_DATA',
        activationCode: this.generateMockActivationCode(),
        status: 'active',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
    }

    throw new Error('Real Airalo API not implemented yet');
  }

  /**
   * Helper: Generate mock ICCID
   */
  private generateMockICCID(): string {
    const digits = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
    return `89${digits}`;
  }

  /**
   * Helper: Generate mock activation code
   */
  private generateMockActivationCode(): string {
    return `LPA:1$mock.esim.com$${Math.random().toString(36).substring(2, 15)}`;
  }

  /**
   * Helper: Generate QR code URL
   */
  private generateQRCodeUrl(iccid: string, code: string): string {
    const data = encodeURIComponent(code);
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${data}`;
  }

  /**
   * Check if using mock mode
   */
  isMockMode(): boolean {
    return USE_MOCK;
  }
}

export const airaloService = new MockAiraloService();
