import React, {memo, useEffect} from 'react';
import './styles.css';

const AboutUs: React.FC = () => {
  useEffect(() => {
    const loadImages = async () => {
      const promises: Promise<string>[] = await [
        'about-us-1.jpeg',
        'about-us-2.jpeg',
        'about-us-3.jpeg',
      ].map((image: string) => {
        return new Promise((resolve: any, reject: any) => {
          const newImage = new Image();
          newImage.src = `/images/${image}`;
          newImage.onload = resolve();
          newImage.onerror = reject();
        });
      });

      await Promise.all(promises);
    };

    loadImages();
  }, []);

  return (
    <div className="about-us">
      <h2>Our family promise</h2>
      <p>
        Simple, delicious, organic ingredients. Ethically sourced. Less sugar,
        minimal processing and eco-friendly packaging. It’s what our family
        looks for and I’m sure yours does too. We take our inspiration from
        today’s family pantry, blending single origin cacao with organic oats,
        local sea salt, organic almonds, house-roasted coffees, and so much
        more.
      </p>
      <img src="/images/about-us-1.jpeg" />
      <h2>Certified organic</h2>
      <p>
        We have been exclusively sourcing organic ingredients for years but
        decided to put a ring on it. We noticed our own family’s shopping habits
        almost always looked for that organic seal of approval, and as much as
        we know that many small-batch producers like ourselves are practicing
        best in class sustainability, its important to communicate that to the
        shoppers. So, Mast is now officially organic and USDA certified by the
        NFC. We are proud to participate in a global movement towards
        sustainable and regenerative agriculture.
      </p>
      <img src="/images/about-us-2.jpeg" />
      <h2>Beautiful design</h2>
      <p>
        Husband and wife design duo (and longtime Mast family friends) Carla
        Venticinque Osborn and Aaron Osborn have brought their artful, handmade,
        organic craft to the front of Mast bars using traditional block printing
        techniques with hand mixed natural pigments. Their one of a kind
        abstract designs and breathtaking simplicity make every bar as delicious
        on the outside as it is on the inside.
      </p>
      <img src="/images/about-us-3.jpeg" />
    </div>
  );
};

export default memo(AboutUs);
