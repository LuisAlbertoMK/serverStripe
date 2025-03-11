// This is your test secret API key.
const stripe = Stripe("pk_test_51NOlofEg8nFeK6NC5vc2fyMVer0VolgF93B3sk60HbPUzPM0p93nQLAoxJuoXr00c0DDVJ6iU55NdOMYiTgeB8hy00KurfK9Is");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}