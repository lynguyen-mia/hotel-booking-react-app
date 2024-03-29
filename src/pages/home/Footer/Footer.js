import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  const footerMenu = [
    {
      col_number: 1,
      col_values: [
        "Locations",
        "Countries",
        "Regions",
        "Cities",
        "Districts",
        "Airports",
        "Hotels"
      ]
    },
    {
      col_number: 2,
      col_values: [
        "Properties",
        "Homes",
        "Apartments",
        "Resorts",
        "Villas",
        "Hostels",
        "Guest houses"
      ]
    },
    {
      col_number: 3,
      col_values: [
        "Explore more",
        "Unique places to stay",
        "Reviews",
        "Unpacked: Travel articles",
        "Travel communities",
        "Seasonal and holiday deals"
      ]
    },
    {
      col_number: 4,
      col_values: [
        "Support",
        "Car rental",
        "Flight Finder",
        "Restaurant reservations",
        "Travel Agents"
      ]
    },
    {
      col_number: 5,
      col_values: [
        "About us",
        "Curtomer Service",
        "Partner Help",
        "Careers",
        "Sustainability",
        "Press center",
        "Safety Resource Center",
        "Investor relations",
        "Terms & conditions"
      ]
    }
  ];

  return (
    <div className={styles.footer}>
      <div className={styles["footer-container"]}>
        {footerMenu.map((obj) => (
          // create footer columns
          <div key={obj.col_number} className={styles["footer-col"]}>
            {/* create links for each column */}
            {obj.col_values.map((col, i) => (
              <a href="#" className={styles["footer-link"]} key={i}>
                {col}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
