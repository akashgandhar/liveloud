"use client";
import { useAuth } from "@/contexts/auth/context";
import { useParams } from "next/navigation";
import React from "react";
import EditProfileDiolog from "./EditProfileDiolog";

export default function MainProfile() {
  const { user, isLoading } = useAuth();
  const { profileId } = useParams();
  return (
    // <div class="container">
    <div class="profile-card bg-gray-100">
      <div class="profile-header">
        <div class="main-profile">
          <img src={user?.photoURL} class="profile-image"></img>
          <div class="profile-names">
            <h1 class="username">{user?.displayName}</h1>
            <small class="page-title">@handle</small>
          </div>
        </div>
      </div>

      <div class="profile-body">
        <div class="profile-actions">
          {user?.uid === profileId ? (
            <EditProfileDiolog>
              <button class="follow">Edit</button>
            </EditProfileDiolog>
          ) : (
            <button class="follow">
              {isLoading ? "Loading..." : "Follow"}
            </button>
          )}
          {user?.uid != profileId && <button class="message">Subscribe</button>}

          <section class="bio">
            <div class="bio-header">
              <i class="fa fa-info-circle"></i>
              Info
            </div>
            <p class="bio-text">+91 7983461538</p>
            <p class="bio-text">+91 7983461538</p>
          </section>
        </div>

        <div class="account-info">
          <div class="data">
            <div class="important-data">
              <section class="data-item">
                <h3 class="value">104</h3>
                <small class="title">Post</small>
              </section>
              <section class="data-item">
                <h3 class="value">21K</h3>
                <small class="title">Follower</small>
              </section>
              <section class="data-item">
                <h3 class="value">51</h3>
                <small class="title">Following</small>
              </section>
            </div>
            <div class="other-data">
              <section class="data-item">
                <h3 class="value">41K</h3>
                <small class="title">Likes</small>
              </section>
              <section class="data-item">
                <h3 class="value">12K</h3>
                <small class="title">Comments</small>
              </section>
              <section class="data-item">
                <h3 class="value">2K</h3>
                <small class="title">Saved</small>
              </section>
            </div>
          </div>

          <div class="social-media">
            <span>Follow me in:</span>
            <a href="" class="media-link">
              <i class="fab fa-facebook-square"></i>
            </a>
            <a href="https://twitter.com/MammadSahragard" class="media-link">
              <i class="fab fa-twitter-square"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/mohammadsahragard/"
              class="media-link"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/mammad.sahragard/"
              class="media-link"
            >
              <i class="fab fa-instagram-square"></i>
            </a>
            <a href="https://github.com/MohammadSahragard" class="media-link">
              <i class="fab fa-github-square"></i>
            </a>
          </div>

          <div class="last-post">
            <div class="post-cover">
              <span class="last-badge">Last Post</span>
            </div>
            <h3 class="post-title">3D layer</h3>
            <button class="post-CTA">View</button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
