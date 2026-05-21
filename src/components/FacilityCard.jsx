'use client'
import React from 'react';
import { motion } from "framer-motion";
import { MapPin, Users, Clock, Star } from "lucide-react";
import { Button } from '@heroui/react'; 
import Link from 'next/link';

const FacilityCard = ({ facilitie, index = 0 }) => {
  if (!facilitie) return null;

  const {
    _id,
    id,
    facilityName,
    facilityType,
    image,
    location,
    pricePerHour,
    capacity,
    availableSlot,
    rating
  } = facilitie;

  const facilityId = _id || id || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className="group"
    >
      <Link href={`/facilities/${facilityId}`} className="block h-full">
        <div className="h-full bg-card rounded-2xl overflow-hidden border border-border transition-all duration-300 hover:border-cyan/30 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] card-glow">
          
          <div className="relative h-48 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url('${image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan/20 text-cyan backdrop-blur-sm">
                {facilityType}
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-navy/80 backdrop-blur-sm">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-medium">{rating || "4.5"}</span>
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan transition-colors line-clamp-1">
              {facilityName}
            </h3>

            <div className="flex items-center gap-1 text-muted-foreground mb-4">
              <MapPin className="w-4 h-4 text-cyan" />
              <span className="text-sm line-clamp-1">{location}</span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-green" />
                  <span className="text-sm text-muted-foreground">{capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-orange" />
                  <span className="text-sm text-muted-foreground">
                    {availableSlot} slots
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="text-2xl font-bold text-cyan">${pricePerHour}</span>
                <span className="text-sm text-muted-foreground">/hour</span>
              </div>
              
              <Button
                size="sm"
                className="gradient-cyan text-navy font-semibold hover:opacity-90 transition-opacity"
              >
                Book Now
              </Button>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

export default FacilityCard;