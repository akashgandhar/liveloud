"use client";
import React from "react";

export default function Main() {
  return (
    <div class="w-full text-center rounded-md  p-8 shadow-xs">
      <div class="mb-6 flex items-center justify-center">
        <h2 class="text-2xl font-bold text-gray-800">Premium Account</h2>
      </div>

      <p class="mb-4 text-gray-600">
        Upgrade to our Premium Account for an enhanced social media experience
        with the following exclusive features:
      </p>

      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-800">
            Enhanced Experience
          </h3>
          <ul class="list-inside list-disc text-gray-600">
            <li>Ads in For You feed</li>
            <li>Full reply boost functionality</li>
            <li>Smallest edit post option</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-800">Longer Posts</h3>
          <ul class="list-inside list-disc text-gray-600">
            <li>Undo post feature</li>
            <li>Post longer videos</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-800">Top Articles</h3>
          <ul class="list-inside list-disc text-gray-600">
            <li>Reader mode for articles</li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-800">Video Features</h3>
          <ul class="list-inside list-disc text-gray-600">
            <li>Background video playback</li>
            <li>Download videos for offline viewing</li>
          </ul>
        </div>
      </div>

      <div class="mt-6 flex justify-between space-x-4">
        <div class="flex-1 rounded-md bg-white cursor-pointer hover:outline outline-gray-300 p-4">
          <p class="text-sm text-gray-600">Monthly Subscription</p>
          <p class="text-lg font-bold text-gray-800">TBD</p>
        </div>

        <div class="flex-1 rounded-md bg-white cursor-pointer hover:outline outline-gray-300 p-4">
          <p class="text-sm text-gray-600">Annual Subscription</p>
          <p class="text-lg font-bold text-gray-800">TBD</p>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-center">
        <button class="cursor-pointer rounded-md border bg-[#009ED9] px-4 py-2 text-white hover:border-[#009ED9] hover:bg-white hover:text-[#009ED9]">
          Subscribe Now
        </button>
      </div>

      <div class="mt-4 rounded-md border border-[#009ED9] p-4 text-sm text-gray-600">
        <p>
          By subscribing, you agree to our{" "}
          <u class="font-semibold text-[#009ED9] cursor-pointer">
            <em>Purchaser Terms of Service</em>
          </u>
          . Subscriptions auto-renew until canceled, as described in the Terms.
          Cancel anytime. Cancel at least 24 hours prior to renewal to avoid
          additional charges. A verified phone number is required to subscribe.
          If you&apos;ve subscribed on another platform, manage your
          subscription through that platform.
        </p>
      </div>
    </div>
  );
}
