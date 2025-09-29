package com.zabfind

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.graphics.LinearGradient
import android.graphics.Shader
import android.graphics.Color
import android.view.View
import android.view.ViewTreeObserver
import android.animation.ObjectAnimator
import android.animation.AnimatorSet
import android.view.animation.AccelerateDecelerateInterpolator
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.widget.TextView
import androidx.constraintlayout.widget.ConstraintLayout

class SplashActivity : Activity() {

    private val TAG = "SplashActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        try {
            setContentView(R.layout.splash)
        } catch (e: Exception) {
            Log.e(TAG, "Error setting content view: ${e.message}")
            proceedToMainActivity()
            return
        }

        val tvZab = findViewById<TextView>(R.id.tv_zab)
        val tvSub = findViewById<TextView>(R.id.tv_sub)
        val root = findViewById<ConstraintLayout>(R.id.root)

        if (tvZab == null || tvSub == null || root == null) {
            Log.e(TAG, "One or more views are null: tvZab=$tvZab, tvSub=$tvSub, root=$root")
            proceedToMainActivity()
            return
        }

        // Apply gradient to "ZAB"
        try {
            tvZab.paint.shader = LinearGradient(
                0f, 0f, tvZab.paint.measureText(tvZab.text.toString()), 0f,
                intArrayOf(Color.parseColor("#0C54A3"), Color.parseColor("#4A90E2")),
                null, Shader.TileMode.CLAMP
            )
        } catch (e: Exception) {
            Log.e(TAG, "Error applying gradient to ZAB: ${e.message}")
        }

        // Apply gradient to "Lost & Fınd"
        try {
            tvSub.paint.shader = LinearGradient(
                0f, 0f, tvSub.paint.measureText(tvSub.text.toString()), 0f,
                intArrayOf(Color.parseColor("#0C54A3"), Color.parseColor("#4A90E2")),
                null, Shader.TileMode.CLAMP
            )
        } catch (e: Exception) {
            Log.e(TAG, "Error applying gradient to Lost & Fınd: ${e.message}")
        }

        // Create the dot view
        val dot = View(this)
        val params = ConstraintLayout.LayoutParams(20, 20)
        dot.layoutParams = params
        try {
            dot.setBackgroundResource(R.drawable.dot)
        } catch (e: Exception) {
            Log.e(TAG, "Error setting dot background: ${e.message}")
            proceedToMainActivity()
            return
        }
        dot.visibility = View.INVISIBLE
        root.addView(dot)

        // Calculate position after layout
        tvSub.viewTreeObserver.addOnGlobalLayoutListener(object : ViewTreeObserver.OnGlobalLayoutListener {
            override fun onGlobalLayout() {
                tvSub.viewTreeObserver.removeOnGlobalLayoutListener(this)

                try {
                    val text = tvSub.text.toString()
                    val findIndex = text.indexOf("Fınd")
                    if (findIndex == -1) {
                        Log.e(TAG, "Text 'Fınd' not found, skipping dot animation")
                        proceedToMainActivity()
                        return
                    }

                    val iIndex = findIndex + 1 // Position of 'ı' in "Fınd"
                    val layout = tvSub.layout
                    if (layout == null) {
                        Log.e(TAG, "TextView layout is null, skipping animation")
                        proceedToMainActivity()
                        return
                    }

                    val x = layout.getPrimaryHorizontal(iIndex)
                    val line = layout.getLineForOffset(iIndex)
                    val baseline = layout.getLineBaseline(line)
                    val ascent = tvSub.paint.fontMetrics.ascent

                    // Position dot above 'ı', slightly lower
                    val targetX = (tvSub.left + x + (tvSub.paint.measureText("ı") / 2) - 10).toFloat()
                    val targetY = (tvSub.top + baseline + ascent - 7).toFloat() // Changed from -15 to -10

                    dot.translationX = -200f
                    dot.translationY = root.height.toFloat() + 200f
                    dot.visibility = View.VISIBLE

                    val animX = ObjectAnimator.ofFloat(dot, "translationX", -200f, targetX)
                    val animY = ObjectAnimator.ofFloat(dot, "translationY", root.height.toFloat() + 200f, targetY)
                    animX.duration = 1500
                    animY.duration = 1500
                    animX.interpolator = AccelerateDecelerateInterpolator()
                    animY.interpolator = AccelerateDecelerateInterpolator()

                    val animatorSet = AnimatorSet()
                    animatorSet.playTogether(animX, animY)
                    animatorSet.start()
                } catch (e: Exception) {
                    Log.e(TAG, "Animation error: ${e.message}")
                } finally {
                    proceedToMainActivity()
                }
            }
        })
    }

    private fun proceedToMainActivity() {
        Handler(Looper.getMainLooper()).postDelayed({
            try {
                startActivity(Intent(this@SplashActivity, MainActivity::class.java))
                finish()
            } catch (e: Exception) {
                Log.e(TAG, "Error starting MainActivity: ${e.message}")
            }
        }, 2000)
    }
}